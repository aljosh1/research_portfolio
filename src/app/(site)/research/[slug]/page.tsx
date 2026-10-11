import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Paragraphs } from "@/components/paragraphs";
import { projectStatusLabels } from "@/lib/labels";
import { getProjectBySlug } from "@/lib/queries";
import { safeUrl, yearRange } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: project.imageUrl ? [project.imageUrl] : undefined },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  const external = safeUrl(project.externalUrl);
  return (
    <>
      <header className="detail-header">
        <div className="container">
          <Link href="/research" className="link-arrow">← All research</Link>
          <h1>{project.title}</h1>
          <p className="lede">{project.summary}</p>
        </div>
      </header>
      <div className="container detail-layout">
        <div className="prose">
          {project.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.imageUrl} alt={project.imageAlt} style={{ borderRadius: 8, marginBottom: 24 }} />
          )}
          <Paragraphs text={project.description} />
          {project.outcomes && (<><h2>Outcomes</h2><Paragraphs text={project.outcomes} /></>)}
        </div>
        <aside className="facts">
          <dl>
            <dt>Status</dt><dd>{projectStatusLabels[project.status]}</dd>
            {(project.startYear || project.endYear) && (<><dt>Period</dt><dd>{yearRange(project.startYear, project.endYear, project.status === "ONGOING")}</dd></>)}
            {project.funder && (<><dt>Funder</dt><dd>{project.funder}</dd></>)}
            {project.collaborators && (<><dt>Collaborators</dt><dd>{project.collaborators}</dd></>)}
            {project.keywords.length > 0 && (<><dt>Keywords</dt><dd>{project.keywords.join(", ")}</dd></>)}
          </dl>
          {external && (
            <a className="btn btn-outline btn-sm" href={external} target="_blank" rel="noopener noreferrer">
              Project website <ExternalLink size={13} />
            </a>
          )}
        </aside>
      </div>
    </>
  );
}