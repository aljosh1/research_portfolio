"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type { Role } from "@/generated/prisma/client";
import {
  DUMMY_HASH,
  createSession,
  destroySession,
  hashPassword,
  requireAdmin,
  requireUser,
  verifyPassword,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { rateLimit, resetRateLimit } from "@/lib/rate-limit";
import { slugify, clientIp } from "@/lib/utils";
import {
  loginSchema,
  newsSchema,
  parseForm,
  passwordSchema,
  profileSchema,
  projectSchema,
  publicationSchema,
  timelineSchema,
  userSchema,
  type FormState,
} from "@/lib/validation";

type State = FormState;

function refresh(...paths: string[]) {
  for (const path of paths) revalidatePath(path);
  revalidatePath("/", "layout");
}

async function uniqueSlug(model: "publication" | "project", title: string, ignoreId?: string) {
  const base = slugify(title);
  let slug = base;
  for (let i = 2; i < 100; i++) {
    const existing =
      model === "publication"
        ? await db.publication.findUnique({ where: { slug }, select: { id: true } })
        : await db.project.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${i}`;
  }
  return `${base}-${Date.now()}`;
}

/* ---------- Authentication ---------- */

export async function loginAction(_: State, formData: FormData): Promise<State> {
  const parsed = parseForm(loginSchema, formData);
  if (parsed.error) return { error: "Enter your email and password." };
  const { email, password } = parsed.data;

  const ip = clientIp(await headers());
  const key = `login:${ip}:${email}`;
  const limit = rateLimit(key, 5, 15 * 60 * 1000);
  if (!limit.ok) {
    return { error: `Too many attempts. Try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).` };
  }
  if (!rateLimit(`login-ip:${ip}`, 30, 15 * 60 * 1000).ok) {
    return { error: "Too many attempts from this network. Try again later." };
  }

  const user = await db.user.findUnique({ where: { email } });
  const valid = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !valid) return { error: "Incorrect email or password." };

  resetRateLimit(key);
  await createSession({ id: user.id, email: user.email, name: user.name, role: user.role });
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------- Profile ---------- */

export async function saveProfileAction(_: State, formData: FormData): Promise<State> {
  await requireUser();
  const parsed = parseForm(profileSchema, formData);
  if (parsed.error) return parsed.error;
  await db.profile.upsert({
    where: { id: "main" },
    create: { id: "main", ...parsed.data },
    update: parsed.data,
  });
  refresh("/", "/about", "/contact");
  return { ok: true };
}

/* ---------- Publications ---------- */

function publicationData(data: NonNullable<ReturnType<typeof parseForm<typeof publicationSchema>>["data"]>) {
  const { type, status, ...rest } = data;
  return {
    ...rest,
    type: type as never,
    status: status as never,
    searchText: [data.title, data.authors.join(" "), data.keywords.join(" "), data.venue, data.doi, data.subject]
      .join(" ")
      .toLowerCase(),
  };
}

export async function savePublicationAction(id: string | null, _: State, formData: FormData): Promise<State> {
  await requireUser();
  const parsed = parseForm(publicationSchema, formData);
  if (parsed.error) return parsed.error;
  const data = publicationData(parsed.data);
  if (id) {
    await db.publication.update({ where: { id }, data });
  } else {
    await db.publication.create({ data: { ...data, slug: await uniqueSlug("publication", data.title) } });
  }
  refresh("/publications");
  redirect("/admin/publications?saved=1");
}

export async function deletePublicationAction(id: string) {
  await requireUser();
  await db.publication.delete({ where: { id } });
  refresh("/publications");
  redirect("/admin/publications?deleted=1");
}

/* ---------- Projects ---------- */

export async function saveProjectAction(id: string | null, _: State, formData: FormData): Promise<State> {
  await requireUser();
  const parsed = parseForm(projectSchema, formData);
  if (parsed.error) return parsed.error;
  const data = { ...parsed.data, status: parsed.data.status as never };
  if (id) {
    await db.project.update({ where: { id }, data });
  } else {
    await db.project.create({ data: { ...data, slug: await uniqueSlug("project", data.title) } });
  }
  refresh("/research");
  redirect("/admin/projects?saved=1");
}

export async function deleteProjectAction(id: string) {
  await requireUser();
  await db.project.delete({ where: { id } });
  refresh("/research");
  redirect("/admin/projects?deleted=1");
}

/* ---------- News ---------- */

export async function saveNewsAction(id: string | null, _: State, formData: FormData): Promise<State> {
  await requireUser();
  const parsed = parseForm(newsSchema, formData);
  if (parsed.error) return parsed.error;
  if (id) await db.newsItem.update({ where: { id }, data: parsed.data });
  else await db.newsItem.create({ data: parsed.data });
  refresh("/news");
  redirect("/admin/news?saved=1");
}

export async function deleteNewsAction(id: string) {
  await requireUser();
  await db.newsItem.delete({ where: { id } });
  refresh("/news");
  redirect("/admin/news?deleted=1");
}

/* ---------- Academic timeline (CV entries) ---------- */

export async function saveTimelineAction(id: string | null, _: State, formData: FormData): Promise<State> {
  await requireUser();
  const parsed = parseForm(timelineSchema, formData);
  if (parsed.error) return parsed.error;
  const data = { ...parsed.data, kind: parsed.data.kind as never };
  if (id) await db.timelineEntry.update({ where: { id }, data });
  else await db.timelineEntry.create({ data });
  refresh("/about");
  redirect("/admin/timeline?saved=1");
}

export async function deleteTimelineAction(id: string) {
  await requireUser();
  await db.timelineEntry.delete({ where: { id } });
  refresh("/about");
  redirect("/admin/timeline?deleted=1");
}

/* ---------- Messages ---------- */

export async function toggleMessageReadAction(id: string, read: boolean) {
  await requireUser();
  await db.message.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessageAction(id: string) {
  await requireUser();
  await db.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

/* ---------- Users (admin only) ---------- */

export async function createUserAction(_: State, formData: FormData): Promise<State> {
  await requireAdmin();
  const parsed = parseForm(userSchema, formData);
  if (parsed.error) return parsed.error;
  const { password, ...rest } = parsed.data;
  if (await db.user.findUnique({ where: { email: rest.email } })) {
    return { error: "A user with that email already exists.", fieldErrors: { email: "Already in use" } };
  }
  await db.user.create({ data: { ...rest, role: rest.role as Role, passwordHash: await hashPassword(password) } });
  revalidatePath("/admin/users");
  redirect("/admin/users?saved=1");
}

export async function deleteUserAction(id: string) {
  const me = await requireAdmin();
  if (me.id === id) redirect("/admin/users?error=self");
  const target = await db.user.findUnique({ where: { id } });
  if (target?.role === "ADMIN" && (await db.user.count({ where: { role: "ADMIN" } })) <= 1) {
    redirect("/admin/users?error=last-admin");
  }
  await db.user.delete({ where: { id } });
  revalidatePath("/admin/users");
  redirect("/admin/users?deleted=1");
}

export async function changePasswordAction(_: State, formData: FormData): Promise<State> {
  const me = await requireUser();
  const parsed = parseForm(passwordSchema, formData);
  if (parsed.error) return parsed.error;
  const user = await db.user.findUnique({ where: { id: me.id } });
  if (!user || !(await verifyPassword(parsed.data.current, user.passwordHash))) {
    return { error: "Your current password is incorrect.", fieldErrors: { current: "Incorrect password" } };
  }
  await db.user.update({ where: { id: me.id }, data: { passwordHash: await hashPassword(parsed.data.next) } });
  return { ok: true };
}
