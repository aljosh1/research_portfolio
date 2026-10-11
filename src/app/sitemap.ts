import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const [pubs, projects] = await Promise.all([
    db.publication.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    db.project.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);
  return [
    ...["", "/about", "/research", "/publications", "/news", "/contact"].map((p) => ({
      url: `${base}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...pubs.map((p) => ({ url: `${base}/publications/${p.slug}`, lastModified: p.updatedAt, priority: 0.6 })),
    ...projects.map((p) => ({ url: `${base}/research/${p.slug}`, lastModified: p.updatedAt, priority: 0.6 })),
  ];
}