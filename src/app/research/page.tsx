import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectArtwork } from "@/components/project-artwork";
import { profile, projects } from "@/data/portfolio";

export const metadata = {
  title: "Research projects",
  description: `Research portfolio for ${profile.name}, including current projects and collaborative initiatives.`,
};

export default function ResearchPage() {
  return (
    <main className="detail-page section-shell" style={{ paddingBottom: 88 }}>
      <div className="detail-topbar" style={{ marginTop: 28 }}>
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to homepage
        </Link>
        <span>RESEARCH PORTFOLIO</span>
      </div>

      <section className="detail-hero" style={{ paddingTop: 32 }}>
        <p className="eyebrow">CURRENT WORK</p>
        <h1>
          Research projects
          <span className="accent-dot">.</span>
        </h1>
        <p>
          A selection of collaborative and applied research initiatives designed to support evidence-led institutional and community improvement.
        </p>
      </section>

      <div className="project-grid" style={{ marginTop: 38 }}>
        {projects.map((project) => (
          <article className="project-card" key={project.slug}>
            <Link className="project-image-link" href={`/projects/${project.slug}`}>
              <ProjectArtwork project={project} />
              <span className="project-open">
                <ArrowUpRight size={17} />
              </span>
            </Link>
            <div className="project-meta">
              <span>{project.number}</span>
              <span>{project.category}</span>
            </div>
            <div className="project-title-row">
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
              </h3>
            </div>
            <p>{project.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
