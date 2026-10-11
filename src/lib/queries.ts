import { cache } from "react";
import type { Prisma, PublicationStatus, PublicationType } from "@/generated/prisma/client";
import { db } from "@/lib/db";

export const getProfile = cache(async () => {
  const profile = await db.profile.findUnique({ where: { id: "main" } });
  return (
    profile ?? {
      id: "main",
      fullName: "[Full Name]",
      title: "[Academic title]",
      department: "",
      faculty: "",
      university: "[University]",
      location: "",
      headline: "Add your research headline in the admin dashboard.",
      summary: "Add a short biography in the admin dashboard.",
      biography: "",
      teachingPhilosophy: "",
      supervisionInterests: "",
      email: "",
      phone: "",
      availability: "",
      keywords: [] as string[],
      researchInterests: [] as string[],
      portraitUrl: "",
      cvUrl: "",
      scholarUrl: "",
      orcidUrl: "",
      researchGateUrl: "",
      linkedinUrl: "",
      updatedAt: new Date(),
    }
  );
});

export const getTimeline = cache(() =>
  db.timelineEntry.findMany({ orderBy: [{ sortOrder: "asc" }, { startYear: "desc" }] }),
);

export const getFeaturedPublications = (take = 3) =>
  db.publication.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { year: "desc" }, { createdAt: "desc" }],
    take,
  });

export const getFeaturedProjects = (take = 3) =>
  db.project.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    take,
  });

export const getLatestNews = (take = 3) =>
  db.newsItem.findMany({ where: { published: true }, orderBy: { date: "desc" }, take });

export type PublicationQuery = {
  q?: string;
  year?: number;
  type?: PublicationType;
  status?: PublicationStatus;
  subject?: string;
  sort?: "newest" | "oldest" | "title";
  page?: number;
};

export const PAGE_SIZE = 10;

export async function searchPublications(query: PublicationQuery) {
  const where: Prisma.PublicationWhereInput = { published: true };
  if (query.q) where.searchText = { contains: query.q.toLowerCase().slice(0, 100) };
  if (query.year) where.year = query.year;
  if (query.type) where.type = query.type;
  if (query.status) where.status = query.status;
  if (query.subject) where.subject = query.subject;

  const orderBy: Prisma.PublicationOrderByWithRelationInput[] =
    query.sort === "oldest"
      ? [{ year: "asc" }, { title: "asc" }]
      : query.sort === "title"
        ? [{ title: "asc" }]
        : [{ year: "desc" }, { createdAt: "desc" }];

  const page = Math.max(1, query.page ?? 1);
  const [items, total] = await Promise.all([
    db.publication.findMany({ where, orderBy, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    db.publication.count({ where }),
  ]);
  return { items, total, page, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export async function getPublicationFacets() {
  const rows = await db.publication.findMany({
    where: { published: true },
    select: { year: true, subject: true },
  });
  const years = [...new Set(rows.map((r) => r.year))].sort((a, b) => b - a);
  const subjects = [...new Set(rows.map((r) => r.subject).filter(Boolean))].sort();
  return { years, subjects };
}

export const getPublicationBySlug = (slug: string) =>
  db.publication.findFirst({ where: { slug, published: true } });

export const getProjectBySlug = (slug: string) => db.project.findFirst({ where: { slug, published: true } });

export const listProjects = () =>
  db.project.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

export const listNews = () => db.newsItem.findMany({ where: { published: true }, orderBy: { date: "desc" } });
