import Link from "next/link";
import type { Project } from "@/generated/prisma/client";
import { projectStatusLabels } from "@/lib/labels";
import { yearRange } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/research/${project.slug}`} className="card">
      <div className="card-image">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.imageUrl} alt={project.imageAlt} loading="lazy" />
        ) : null}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="badge">{projectStatusLabels[project.status]}</span>
          <span>{yearRange(project.startYear, project.endYear, project.status === "ONGOING")}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="muted">{project.summary}</p>
      </div>
    </Link>
  );
}