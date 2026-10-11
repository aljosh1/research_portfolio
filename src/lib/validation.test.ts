import { describe, expect, it } from "vitest";
import { contactSchema, parseForm, publicationSchema } from "./validation";

function form(values: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(values)) fd.set(k, v);
  return fd;
}

describe("publicationSchema", () => {
  const base = { title: "T", authors: "A One\nB Two", year: "2024", type: "JOURNAL_ARTICLE", status: "PUBLISHED" };

  it("parses authors in order, keywords and normalises DOI", () => {
    const { data } = parseForm(
      publicationSchema,
      form({ ...base, keywords: "a, b;c", doi: "https://doi.org/10.1234/abc", featured: "on" }),
    );
    expect(data?.authors).toEqual(["A One", "B Two"]);
    expect(data?.keywords).toEqual(["a", "b", "c"]);
    expect(data?.doi).toBe("10.1234/abc");
    expect(data?.featured).toBe(true);
    expect(data?.published).toBe(false);
  });

  it("rejects invalid DOI, year and javascript: links", () => {
    const { error } = parseForm(
      publicationSchema,
      form({ ...base, year: "24", doi: "nope", externalUrl: "javascript:alert(1)" }),
    );
    expect(error?.fieldErrors).toMatchObject({
      year: expect.any(String),
      doi: expect.any(String),
      externalUrl: expect.any(String),
    });
  });
});

describe("contactSchema", () => {
  it("rejects filled honeypot and short messages", () => {
    const bad = contactSchema.safeParse({ name: "A", email: "a@b.co", topic: "Consultancy", message: "short", website: "x" });
    expect(bad.success).toBe(false);
  });
  it("accepts a valid enquiry", () => {
    const ok = contactSchema.safeParse({
      name: "Ada",
      email: "ada@example.org",
      topic: "Research collaboration",
      message: "I would like to collaborate.",
    });
    expect(ok.success).toBe(true);
  });
});
