import { z } from "zod";
import { projectStatuses, publicationStatuses, publicationTypes, timelineKinds } from "@/lib/labels";
import { safeUrl, splitList } from "@/lib/utils";

const text = (max: number) => z.string().trim().max(max).default("");
const required = (max: number, label = "This field") =>
  z.string().trim().min(1, `${label} is required`).max(max, `Keep this under ${max} characters`);

const url = z
  .string()
  .trim()
  .max(600)
  .default("")
  .refine((v) => v === "" || safeUrl(v) !== "", "Enter a valid http(s) link");

const list = z
  .string()
  .default("")
  .transform((v) => splitList(v).slice(0, 60));

const checkbox = z
  .string()
  .optional()
  .transform((v) => v === "on" || v === "true");

const optionalYear = z
  .string()
  .trim()
  .default("")
  .refine((v) => v === "" || (/^\d{4}$/.test(v) && Number(v) >= 1800 && Number(v) <= 2100), "Enter a 4-digit year")
  .transform((v) => (v === "" ? null : Number(v)));

const requiredYear = z
  .string()
  .trim()
  .regex(/^\d{4}$/, "Enter a 4-digit year")
  .transform(Number)
  .refine((v) => v >= 1800 && v <= 2100, "Enter a valid year");

const doi = z
  .string()
  .trim()
  .max(200)
  .default("")
  .refine((v) => v === "" || /^(https?:\/\/(dx\.)?doi\.org\/|doi:\s*)?10\.\d{4,9}\/\S+$/i.test(v), "Enter a valid DOI, e.g. 10.1234/abcd")
  .transform((v) => v.replace(/^(https?:\/\/(dx\.)?doi\.org\/|doi:\s*)/i, ""));

export const publicationSchema = z.object({
  title: required(500, "Title"),
  authors: z
    .string()
    .default("")
    .transform((v) =>
      v
        .split(/\n+/)
        .map((a) => a.trim())
        .filter(Boolean),
    )
    .refine((v) => v.length > 0, "Add at least one author (one per line, in order)"),
  year: requiredYear,
  type: z.enum(publicationTypes as [string, ...string[]]),
  status: z.enum(publicationStatuses as [string, ...string[]]),
  venue: text(300),
  publisher: text(300),
  volume: text(40),
  issue: text(40),
  pages: text(40),
  articleNumber: text(40),
  doi,
  isbn: text(30),
  issn: text(30),
  abstract: text(8000),
  keywords: list,
  subject: text(120),
  externalUrl: url,
  pdfUrl: text(600),
  allowDownload: checkbox,
  coverUrl: url,
  featured: checkbox,
  openAccess: checkbox,
  license: text(120),
  published: checkbox,
});

export const projectSchema = z.object({
  title: required(300, "Title"),
  summary: required(600, "Summary"),
  description: text(20000),
  status: z.enum(projectStatuses as [string, ...string[]]),
  startYear: optionalYear,
  endYear: optionalYear,
  funder: text(300),
  collaborators: text(1000),
  outcomes: text(5000),
  imageUrl: url,
  imageAlt: text(300),
  keywords: list,
  externalUrl: url,
  featured: checkbox,
  published: checkbox,
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
});

export const newsSchema = z.object({
  title: required(300, "Title"),
  summary: required(600, "Summary"),
  body: text(20000),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date")
    .transform((v) => new Date(v)),
  published: checkbox,
});

export const timelineSchema = z.object({
  kind: z.enum(timelineKinds as [string, ...string[]]),
  title: required(300, "Title"),
  organization: text(300),
  location: text(200),
  startYear: optionalYear,
  endYear: optionalYear,
  current: checkbox,
  description: text(3000),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0),
});

export const profileSchema = z.object({
  fullName: required(200, "Full name"),
  title: required(200, "Academic title"),
  department: text(200),
  faculty: text(200),
  university: text(200),
  location: text(200),
  headline: required(300, "Headline"),
  summary: required(1500, "Short biography"),
  biography: text(20000),
  teachingPhilosophy: text(8000),
  supervisionInterests: text(4000),
  email: z
    .string()
    .trim()
    .default("")
    .refine((v) => v === "" || /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v), "Enter a valid email"),
  phone: text(50),
  availability: text(300),
  keywords: list,
  researchInterests: list,
  portraitUrl: text(600),
  cvUrl: text(600),
  scholarUrl: url,
  orcidUrl: url,
  researchGateUrl: url,
  linkedinUrl: url,
});

export const userSchema = z.object({
  name: required(120, "Name"),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(254),
  role: z.enum(["ADMIN", "EDITOR"]),
  password: z.string().min(12, "Use at least 12 characters").max(200),
});

export const passwordSchema = z
  .object({
    current: z.string().min(1, "Enter your current password"),
    next: z.string().min(12, "Use at least 12 characters").max(200),
    confirm: z.string(),
  })
  .refine((v) => v.next === v.confirm, { path: ["confirm"], message: "Passwords do not match" });

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(200),
});

export const contactTopics = [
  "Research collaboration",
  "Speaking / conference invitation",
  "Postgraduate supervision",
  "Consultancy",
  "Media / other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100)
    .refine((v) => !/[\r\n]/.test(v), "Invalid name"),
  email: z
    .string()
    .trim()
    .max(254)
    .regex(/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/, "Enter a valid email address"),
  topic: z.enum(contactTopics),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(5000),
  website: z.string().max(0).optional().default(""),
});

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: boolean } | undefined;

export function parseForm<T extends z.ZodType>(schema: T, formData: FormData) {
  const raw: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$ACTION")) raw[key] = value;
  }
  const result = schema.safeParse(raw);
  if (result.success) return { data: result.data as z.output<T> };
  const fieldErrors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] ??= issue.message;
  }
  return { error: { error: "Please fix the highlighted fields.", fieldErrors } satisfies NonNullable<FormState> };
}
