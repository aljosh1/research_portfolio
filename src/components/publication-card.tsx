import { Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Publication } from "@/generated/prisma/client";
import { publicationStatusLabels, publicationTypeLabels } from "@/lib/labels";
import { safeUrl } from "@/lib/utils";

export function PublicationCard({ pub }: { pub: Publication }) {
  const canDownload = pub.allowDownload && !!pub.pdfUrl;
  const external = safeUrl(pub.externalUrl);
  return (
    <article className="pub">
      <div>
        <div className="card-meta">
          <span className="badge">{publicationTypeLabels[pub.type]}</span>
          {pub.status !== "PUBLISHED" && <span className="badge badge-muted">{publicationStatusLabels[pub.status]}</span>}
          {pub.openAccess && <span className="badge badge-ok">Open access</span>}
          <span>{pub.year}</span>
        </div>
        <h3>
          <Link href={`/publications/${pub.slug}`}>{pub.title}</Link>
        </h3>
        <p className="pub-authors">{pub.authors.join(", ")}</p>
        {pub.venue && <p className="pub-venue"><em>{pub.venue}</em></p>}
        <div className="pub-actions">
          <Link href={`/publications/${pub.slug}`} className="btn btn-outline btn-sm">Details &amp; cite</Link>
          {pub.doi && (
            <a className="btn btn-outline btn-sm" href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
              DOI <ExternalLink size={13} />
            </a>
          )}
          {external && !pub.doi && (
            <a className="btn btn-outline btn-sm" href={external} target="_blank" rel="noopener noreferrer">
              Link <ExternalLink size={13} />
            </a>
          )}
          {canDownload && (
            <a className="btn btn-primary btn-sm" href={`/publications/${pub.slug}/download`}>
              <Download size={13} /> PDF
            </a>
          )}
        </div>
      </div>
      {pub.coverUrl && safeUrl(pub.coverUrl) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="pub-thumb" src={pub.coverUrl} alt="" loading="lazy" />
      ) : null}
    </article>
  );
}