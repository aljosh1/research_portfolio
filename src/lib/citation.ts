import type { PublicationStatus, PublicationType } from "@/generated/prisma/client";

export type CitationStyle = "APA" | "IEEE" | "Harvard" | "Vancouver";
export const citationStyles: CitationStyle[] = ["APA", "IEEE", "Harvard", "Vancouver"];

export type CitableWork = {
  title: string;
  authors: string[];
  year: number;
  type: PublicationType;
  status: PublicationStatus;
  venue?: string | null;
  publisher?: string | null;
  volume?: string | null;
  issue?: string | null;
  pages?: string | null;
  articleNumber?: string | null;
  doi?: string | null;
  isbn?: string | null;
};

type Name = { family: string; given: string[] };

/** Accepts "Given Family" or "Family, Given" and never invents missing parts. */
export function parseName(raw: string): Name {
  const name = raw.trim().replace(/\s+/g, " ");
  if (name.includes(",")) {
    const [family, given = ""] = name.split(",", 2).map((part) => part.trim());
    return { family, given: given.split(/[\s.]+/).filter(Boolean) };
  }
  const parts = name.split(" ");
  if (parts.length === 1) return { family: parts[0], given: [] };
  return { family: parts[parts.length - 1], given: parts.slice(0, -1).flatMap((p) => p.split(/[.\-]+/)).filter(Boolean) };
}

const initials = (given: string[], dots: boolean, space: boolean) =>
  given.map((g) => g[0].toUpperCase() + (dots ? "." : "")).join(space ? " " : "");

function authorList(authors: string[], style: CitationStyle) {
  const names = authors.map(parseName);
  if (style === "APA") {
    const formatted = names.map((n) => (n.given.length ? `${n.family}, ${initials(n.given, true, true)}` : n.family));
    if (formatted.length <= 1) return formatted.join("");
    if (formatted.length === 2) return `${formatted[0]}, & ${formatted[1]}`;
    const shown = formatted.length > 20 ? [...formatted.slice(0, 19), `. . . ${formatted[formatted.length - 1]}`] : formatted;
    return formatted.length > 20
      ? shown.join(", ")
      : `${shown.slice(0, -1).join(", ")}, & ${shown[shown.length - 1]}`;
  }
  if (style === "IEEE") {
    const formatted = names.map((n) => (n.given.length ? `${initials(n.given, true, true)} ${n.family}` : n.family));
    if (formatted.length > 6) return `${formatted[0]} et al.`;
    if (formatted.length <= 2) return formatted.join(" and ");
    return `${formatted.slice(0, -1).join(", ")}, and ${formatted[formatted.length - 1]}`;
  }
  if (style === "Harvard") {
    const formatted = names.map((n) => (n.given.length ? `${n.family}, ${initials(n.given, true, false)}` : n.family));
    if (formatted.length > 3) return `${formatted[0]} et al.`;
    if (formatted.length <= 2) return formatted.join(" and ");
    return `${formatted.slice(0, -1).join(", ")} and ${formatted[formatted.length - 1]}`;
  }
  // Vancouver
  const formatted = names.map((n) => (n.given.length ? `${n.family} ${initials(n.given, false, false)}` : n.family));
  return formatted.length > 6 ? `${formatted.slice(0, 6).join(", ")}, et al` : formatted.join(", ");
}

const clean = (value?: string | null) => (value ?? "").trim();
const endDot = (text: string) => (/[.?!]$/.test(text) ? text : `${text}.`);
const pageRange = (pages: string) => pages.replace(/\s*[-–—]+\s*/, "–");
const doiUrl = (doi: string) => (doi.startsWith("http") ? doi : `https://doi.org/${doi.replace(/^doi:\s*/i, "")}`);
const bareDoi = (doi: string) => doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "").replace(/^doi:\s*/i, "");

function statusNote(status: PublicationStatus) {
  if (status === "ACCEPTED") return "in press";
  if (status === "SUBMITTED") return "manuscript submitted for publication";
  if (status === "PREPRINT") return "preprint";
  return "";
}

export function formatCitation(work: CitableWork, style: CitationStyle): string {
  const title = clean(work.title);
  const venue = clean(work.venue);
  const publisher = clean(work.publisher);
  const volume = clean(work.volume);
  const issue = clean(work.issue);
  const pages = pageRange(clean(work.pages) || clean(work.articleNumber));
  const doi = clean(work.doi);
  const isBookLike = work.type === "BOOK" || work.type === "EDITED_BOOK";
  const container = isBookLike ? "" : venue;
  const imprint = isBookLike ? publisher || venue : publisher;
  const note = statusNote(work.status);
  const authors = work.authors.length ? authorList(work.authors, style) : "";
  const year = String(work.year);

  if (style === "APA") {
    const head = authors ? `${endDot(authors)} (${year}).` : `(${year}).`;
    const parts = [head, endDot(title)];
    if (container) {
      let src = container;
      if (volume) src += `, ${volume}`;
      if (issue) src += `(${issue})`;
      if (pages) src += `, ${pages}`;
      parts.push(endDot(src));
    }
    if (imprint) parts.push(endDot(imprint));
    if (note) parts.push(endDot(`(${note})`));
    if (doi) parts.push(doiUrl(doi));
    return parts.join(" ");
  }

  if (style === "IEEE") {
    const segs: string[] = [];
    if (container) segs.push(container);
    if (imprint) segs.push(imprint);
    if (volume) segs.push(`vol. ${volume}`);
    if (issue) segs.push(`no. ${issue}`);
    if (pages) segs.push(`${/^\d+–\d+$/.test(pages) ? "pp." : "Art."} ${pages}`);
    segs.push(year);
    if (note) segs.push(note);
    if (doi) segs.push(`doi: ${bareDoi(doi)}`);
    const quoted = container || !imprint ? `"${title},"` : `${title},`;
    return `${authors ? `${authors}, ` : ""}${quoted} ${segs.join(", ")}.`;
  }

  if (style === "Harvard") {
    const head = authors ? `${authors} (${year})` : `(${year})`;
    const parts = [container ? `${head} '${title}',` : `${head} ${title}.`];
    if (container) {
      let src = container;
      if (volume) src += `, ${volume}`;
      if (issue) src += `(${issue})`;
      if (pages) src += `, pp. ${pages}`;
      parts.push(`${src}.`);
    }
    if (imprint) parts.push(endDot(imprint));
    if (note) parts.push(endDot(`(${note})`));
    if (doi) parts.push(`doi:${bareDoi(doi)}.`);
    return parts.join(" ");
  }

  // Vancouver
  const parts: string[] = [];
  if (authors) parts.push(endDot(authors));
  parts.push(endDot(title));
  if (container) {
    let src = `${container}. ${year}`;
    if (volume) src += `;${volume}`;
    if (issue) src += `(${issue})`;
    if (pages) src += `:${pages}`;
    parts.push(endDot(src));
  } else {
    parts.push(endDot(imprint ? `${imprint}; ${year}` : year));
  }
  if (note) parts.push(endDot(`[${note}]`));
  if (doi) parts.push(`doi:${bareDoi(doi)}`);
  return parts.join(" ");
}
