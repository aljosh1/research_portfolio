import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getProfile, listProjects } from "@/lib/queries";

export const metadata: Metadata = { title: "Research", description: "Research interests and projects." };

export default async function ResearchPage() {
  const [profile, projects] = await Promise.all([getProfile(), listProjects()]);
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div><span className="eyebrow">Research</span><h2>Research &amp; projects</h2></div>
        </div>
        {profile.researchInterests.length > 0 && (
          <>
            <h3 style={{ marginBottom: 12 }}>Research interests</h3>
            <ul className="chips" style={{ padding: 0, listStyle: "none", marginBottom: 48 }}>
              {profile.researchInterests.map((k) => <li key={k} className="chip">{k}</li>)}
            </ul>
          </>
        )}
        {projects.length ? (
          <div className="grid grid-3">{projects.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
        ) : (
          <p className="empty">No projects have been published yet.</p>
        )}
      </div>
    </section>
  );
}