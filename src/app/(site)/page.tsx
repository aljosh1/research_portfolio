import { ArrowRight, FileText, GraduationCap, Mail } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "@/components/motion-section";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { getFeaturedProjects, getFeaturedPublications, getLatestNews, getProfile } from "@/lib/queries";
import { formatDate, safeUrl } from "@/lib/utils";

export default async function HomePage() {
  const [profile, pubs, projects, news] = await Promise.all([
    getProfile(),
    getFeaturedPublications(3),
    getFeaturedProjects(3),
    getLatestNews(3),
  ]);
  const initials = profile.fullName.replace(/[^\p{L}\s]/gu, "").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("");
  const cv = safeUrl(profile.cvUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.title,
    affiliation: profile.university ? { "@type": "CollegeOrUniversity", name: profile.university } : undefined,
    email: profile.email || undefined,
    knowsAbout: profile.researchInterests,
    sameAs: [profile.scholarUrl, profile.orcidUrl, profile.researchGateUrl, profile.linkedinUrl].filter((u) => safeUrl(u)),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Academic portfolio</span>
            <h1>{profile.fullName}</h1>
            <p className="hero-title">{profile.title}</p>
            <p className="hero-affil">
              {[profile.department, profile.faculty, profile.university].filter(Boolean).join(" · ")}
            </p>
            <p className="hero-headline">{profile.headline}</p>
            <p className="muted" style={{ maxWidth: "62ch" }}>{profile.summary}</p>
            <div className="hero-actions">
              <Link href="/publications" className="btn btn-primary"><FileText size={17} /> View publications</Link>
              <Link href="/contact" className="btn btn-outline"><Mail size={17} /> Get in touch</Link>
              {cv && <a href={cv} className="btn btn-outline" target="_blank" rel="noopener noreferrer"><GraduationCap size={17} /> Download CV</a>}
            </div>
            {profile.researchInterests.length > 0 && (
              <ul className="chips" style={{ padding: 0, listStyle: "none" }} aria-label="Research interests">
                {profile.researchInterests.map((k) => <li key={k} className="chip">{k}</li>)}
              </ul>
            )}
          </div>
          <div className="portrait">
            {profile.portraitUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.portraitUrl} alt={`Portrait of ${profile.fullName}`} />
            ) : (
              <>
                <span className="portrait-initials" aria-hidden>{initials || "A"}</span>
                <span className="portrait-note">Portrait placeholder</span>
              </>
            )}
          </div>
        </div>
      </section>

      <MotionSection className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Selected work</span><h2>Featured publications</h2></div>
            <Link href="/publications" className="link-arrow">All publications <ArrowRight size={16} /></Link>
          </div>
          {pubs.length ? (
            <div className="pub-list">{pubs.map((p) => <PublicationCard key={p.id} pub={p} />)}</div>
          ) : (
            <p className="empty">No publications have been published yet.</p>
          )}
        </div>
      </MotionSection>

      <MotionSection className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">Research</span><h2>Current projects</h2></div>
            <Link href="/research" className="link-arrow">All research <ArrowRight size={16} /></Link>
          </div>
          {projects.length ? (
            <div className="grid grid-3">{projects.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
          ) : (
            <p className="empty">No research projects have been published yet.</p>
          )}
        </div>
      </MotionSection>

      {news.length > 0 && (
        <MotionSection className="section section-alt">
          <div className="container">
            <div className="section-head">
              <div><span className="eyebrow">Updates</span><h2>Latest news</h2></div>
              <Link href="/news" className="link-arrow">All news <ArrowRight size={16} /></Link>
            </div>
            <div className="grid grid-3">
              {news.map((n) => (
                <Link key={n.id} href={`/news#${n.id}`} className="card">
                  <div className="card-body">
                    <div className="card-meta">{formatDate(n.date)}</div>
                    <h3>{n.title}</h3>
                    <p className="muted">{n.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </MotionSection>
      )}
    </>
  );
}