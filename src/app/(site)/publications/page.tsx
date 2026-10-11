import type { Metadata } from "next";
import Link from "next/link";
import { PublicationCard } from "@/components/publication-card";
import type { PublicationStatus, PublicationType } from "@/generated/prisma/client";
import { publicationStatuses, publicationStatusLabels, publicationTypeLabels, publicationTypes } from "@/lib/labels";
import { getPublicationFacets, searchPublications } from "@/lib/queries";

export const metadata: Metadata = { title: "Publications", description: "Searchable list of publications with citations." };

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function PublicationsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = one(sp.q).trim().slice(0, 100);
  const year = /^\d{4}$/.test(one(sp.year)) ? Number(one(sp.year)) : undefined;
  const type = publicationTypes.includes(one(sp.type) as PublicationType) ? (one(sp.type) as PublicationType) : undefined;
  const status = publicationStatuses.includes(one(sp.status) as PublicationStatus) ? (one(sp.status) as PublicationStatus) : undefined;
  const subject = one(sp.subject).slice(0, 120) || undefined;
  const sort = (["newest", "oldest", "title"] as const).find((s) => s === one(sp.sort)) ?? "newest";
  const page = Math.max(1, Number(one(sp.page)) || 1);

  const [result, facets] = await Promise.all([
    searchPublications({ q, year, type, status, subject, sort, page }),
    getPublicationFacets(),
  ]);

  const href = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (year) params.set("year", String(year));
    if (type) params.set("type", type);
    if (status) params.set("status", status);
    if (subject) params.set("subject", subject);
    if (sort !== "newest") params.set("sort", sort);
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return `/publications${s ? `?${s}` : ""}`;
  };
  const filtered = !!(q || year || type || status || subject);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div><span className="eyebrow">Scholarship</span><h2>Publications</h2></div>
          <p className="muted" role="status">{result.total} result{result.total === 1 ? "" : "s"}</p>
        </div>

        <form className="filters" method="get" action="/publications" role="search" aria-label="Filter publications">
          <div className="field" style={{ margin: 0 }}>
            <label htmlFor="f-q">Search</label>
            <input id="f-q" name="q" className="input" defaultValue={q} placeholder="Title, author, keyword, DOI…" />
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label htmlFor="f-year">Year</label>
            <select id="f-year" name="year" className="select" defaultValue={year ? String(year) : ""}>
              <option value="">All</option>
              {facets.years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label htmlFor="f-type">Type</label>
            <select id="f-type" name="type" className="select" defaultValue={type ?? ""}>
              <option value="">All</option>
              {publicationTypes.map((t) => <option key={t} value={t}>{publicationTypeLabels[t]}</option>)}
            </select>
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label htmlFor="f-status">Status</label>
            <select id="f-status" name="status" className="select" defaultValue={status ?? ""}>
              <option value="">All</option>
              {publicationStatuses.map((s) => <option key={s} value={s}>{publicationStatusLabels[s]}</option>)}
            </select>
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label htmlFor="f-sort">Sort by</label>
            <select id="f-sort" name="sort" className="select" defaultValue={sort}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" type="submit">Apply</button>
            {filtered && <Link className="btn btn-outline" href="/publications">Reset</Link>}
          </div>
          {facets.subjects.length > 0 && (
            <div className="field" style={{ margin: 0, gridColumn: "1 / -1" }}>
              <label htmlFor="f-subject">Subject</label>
              <select id="f-subject" name="subject" className="select" defaultValue={subject ?? ""}>
                <option value="">All subjects</option>
                {facets.subjects.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          )}
        </form>

        {result.items.length ? (
          <div className="pub-list">{result.items.map((p) => <PublicationCard key={p.id} pub={p} />)}</div>
        ) : (
          <p className="empty">{filtered ? "No publications match these filters." : "No publications have been published yet."}</p>
        )}

        {result.pages > 1 && (
          <nav className="pagination" aria-label="Pagination">
            <Link className="page-link" href={href(page - 1)} aria-disabled={page <= 1}>Previous</Link>
            {Array.from({ length: result.pages }, (_, i) => i + 1).map((n) => (
              <Link key={n} className="page-link" href={href(n)} aria-current={n === result.page ? "page" : undefined}>{n}</Link>
            ))}
            <Link className="page-link" href={href(page + 1)} aria-disabled={page >= result.pages}>Next</Link>
          </nav>
        )}
      </div>
    </section>
  );
}