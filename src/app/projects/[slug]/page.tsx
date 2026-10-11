import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { ProjectArtwork } from "@/components/project-artwork";
import { profile, projects } from "@/data/portfolio";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Selected work`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="detail-page">
      <div className="detail-topbar">
        <Link href="/#work" className="back-link">
          <ArrowLeft size={16} /> Back to selected work
        </Link>
        <span>CASE STUDY / {project.number}</span>
      </div>
      <section className="detail-hero">
        <p className="eyebrow">{project.category}</p>
        <h1>
          {project.name}
          <span className="accent-dot">.</span>
        </h1>
        <p>{project.summary}</p>
        <div className="detail-actions">
          <a
            className="button button-dark"
            href={project.demo}
            target="_blank"
            rel="noreferrer"
          >
            View live demo <ArrowUpRight size={16} />
          </a>
          <a
            className="button button-outline"
            href={project.source}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} /> Source code
          </a>
        </div>
      </section>
      <div className="detail-artwork">
        <ProjectArtwork project={project} />
      </div>
      <section className="detail-content">
        <div className="detail-copy">
          <p className="eyebrow">THE STORY</p>
          <h2>Good work starts with a clear problem.</h2>
        </div>
        <div className="detail-sections">
          <article>
            <h3>01 / The challenge</h3>
            <p>{project.problem}</p>
          </article>
          <article>
            <h3>02 / The approach</h3>
            <p>{project.solution}</p>
          </article>
          <article>
            <h3>03 / The outcome</h3>
            <p>{project.impact}</p>
          </article>
        </div>
      </section>
      <section className="detail-stack">
        <p className="eyebrow">BUILT WITH</p>
        <div className="skill-tags">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      <footer className="detail-footer">
        <Link href="/#work">
          <ArrowLeft size={15} /> More selected work
        </Link>
        <Link href="/#contact">
          Have a project in mind? Let&apos;s talk <ArrowUpRight size={15} />
        </Link>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </footer>
    </main>
  );
}
