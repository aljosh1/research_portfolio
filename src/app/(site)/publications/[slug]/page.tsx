import { Download, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CitationBox } from "@/components/citation-box";
import { Paragraphs } from "@/components/paragraphs";
import { citationStyles, formatCitation } from "@/lib/citation";
import { publicationStatusLabels, publicationTypeLabels } from "@/lib/labels";
import { getPublicationBySlug } from "@/lib/queries";
import { safeUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pub = await getPublicationBySlug((await params).slug);
  if (!pub) return {};
  return {
    title: pub.title,
    description: pub.abstract.slice(0, 200) || `${publicationTypeLabels[pub.type]} (${pub.year})`,
    other: {
      citation_title: pub.title,
      citation_publication_date: String(pub.year),
      ...(pub.doi ? { citation_doi: pub.doi } : {}),
      ...(pub.venue ? { citation_journal_title: pub.venue } : {}),
    },
  };
}

export default async function PublicationPage({ params }: Props) {
  const pub = await getPublicationBySlug((await params).slug);
  if (!pub) notFound();

  const citations = Object.fromEntries(citationStyles.map((s) => [s, formatCitation(pub, s)]));
  const canDownload = pub.allowDownload && !!pub.pdfUrl;
  const external = safeUrl(pub.externalUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: pub.title,
    author: pub.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: String(pub.year),
    isPartOf: pub.venue || undefined,
    identifier: pub.doi ? `https://doi.org/${pub.doi}` : undefined,
    abstract: pub.abstract || undefined,
    keywords: pub.keywords.join(", ") || undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="detail-header">
        <div className="container">
          <Link href="/publications" className="link-arrow">← All publications</Link>
          <div className="card-meta" style={{ marginTop: 20 }}>
            <span className="badge">{publicationTypeLabels[pub.type]}</span>
            <span className={`badge ${pub.status === "PUBLISHED" ? "badge-ok" : "badge-muted"}`}>{publicationStatusLabels[pub.status]}</span>
            {pub.openAccess && <span className="badge badge-ok">Open access</span>}
          </div>
          <h1>{pub.title}</h1>
          <p className="lede">{pub.authors.join(", ")}</p>
        </div>
      </header>
      <div className="container detail-layout">
        <div className="prose">
          {pub.abstract && (<><h2 style={{ marginTop: 0 }}>Abstract</h2><Paragraphs text={pub.abstract} /></>)}
          <h2>Cite this work</h2>
          <CitationBox citations={citations} />
          {pub.keywords.length > 0 && (
            <>
              <h2>Keywords</h2>
              <ul className="chips" style={{ padding: 0, listStyle: "none" }}>{pub.keywords.map((k) => <li key={k} className="chip">{k}</li>)}</ul>
            </>
          )}
        </div>
        <aside className="facts">
          <dl>
            <dt>Year</dt><dd>{pub.year}</dd>
            {pub.venue && (<><dt>Venue</dt><dd>{pub.venue}</dd></>)}
            {pub.publisher && (<><dt>Publisher</dt><dd>{pub.publisher}</dd></>)}
            {(pub.volume || pub.issue || pub.pages) && (
              <><dt>Volume / issue / pages</dt><dd>{[pub.volume && `Vol. ${pub.volume}`, pub.issue && `No. ${pub.issue}`, pub.pages && `pp. ${pub.pages}`].filter(Boolean).join(", ")}</dd></>
            )}
            {pub.doi && (<><dt>DOI</dt><dd><a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">{pub.doi}</a></dd></>)}
            {pub.isbn && (<><dt>ISBN</dt><dd>{pub.isbn}</dd></>)}
            {pub.issn && (<><dt>ISSN</dt><dd>{pub.issn}</dd></>)}
            {pub.license && (<><dt>License</dt><dd>{pub.license}</dd></>)}
          </dl>
          <div style={{ display: "grid", gap: 8 }}>
            {canDownload ? (
              <a className="btn btn-primary btn-sm" href={`/publications/${pub.slug}/download`}><Download size={14} /> Download PDF</a>
            ) : pub.pdfUrl ? (
              <p className="hint" style={{ margin: 0 }}>Full text is not available for download. Please contact the author for a copy.</p>
            ) : null}
            {external && (
              <a className="btn btn-outline btn-sm" href={external} target="_blank" rel="noopener noreferrer">
                View at publisher <ExternalLink size={13} />
              </a>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}