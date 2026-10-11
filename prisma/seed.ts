import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const search = (...parts: string[]) => parts.join(" ").toLowerCase();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (12+ characters) in your environment before seeding.");
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (!existing) {
    await db.user.create({
      data: { email, name: "Site Administrator", role: "ADMIN", passwordHash: await bcrypt.hash(password, 12) },
    });
    console.log(`Created admin user ${email}`);
  } else {
    console.log(`Admin user ${email} already exists (password unchanged).`);
  }

  await db.profile.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      fullName: "[Full Name]",
      title: "[Academic title]",
      university: "[University]",
      department: "[Department]",
      headline: "[One-sentence description of your research focus]",
      summary: "[Short biography. Replace this placeholder in Admin → Profile.]",
      researchInterests: ["[Research interest 1]", "[Research interest 2]"],
    },
  });

  if (process.env.SEED_SAMPLE !== "1") return;

  if ((await db.publication.count()) === 0) {
    const pubs = [
      { title: "[Sample] A Placeholder Journal Article", authors: ["[Author One]", "[Author Two]"], year: 2024, type: "JOURNAL_ARTICLE", venue: "[Journal Name]", volume: "12", issue: "3", pages: "45-67", subject: "[Subject area]", featured: true },
      { title: "[Sample] A Placeholder Conference Paper", authors: ["[Author One]"], year: 2023, type: "CONFERENCE_PAPER", venue: "[Conference Name]", subject: "[Subject area]", featured: false },
    ] as const;
    for (const p of pubs) {
      await db.publication.create({
        data: {
          ...p,
          authors: [...p.authors],
          slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          abstract: "Sample abstract. Replace or delete this entry in the admin dashboard.",
          keywords: ["sample"],
          searchText: search(p.title, p.authors.join(" "), "sample", p.venue, p.subject),
        },
      });
    }
  }
  if ((await db.project.count()) === 0) {
    await db.project.create({
      data: {
        slug: "sample-research-project",
        title: "[Sample] Research Project",
        summary: "A placeholder project. Edit or delete it in the admin dashboard.",
        description: "Describe the aims, methods and impact of your project here.",
        status: "ONGOING",
        startYear: 2023,
        featured: true,
      },
    });
  }
  if ((await db.newsItem.count()) === 0) {
    await db.newsItem.create({ data: { title: "[Sample] Welcome to the new website", summary: "Placeholder news item." } });
  }
  if ((await db.timelineEntry.count()) === 0) {
    await db.timelineEntry.create({
      data: { kind: "QUALIFICATION", title: "[Degree, e.g. PhD in …]", organization: "[Institution]", startYear: 2015, endYear: 2019 },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());