import Link from "next/link";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Mail,
  Microscope,
  Sparkles,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { MotionSection } from "@/components/motion-section";
import { ProjectArtwork } from "@/components/project-artwork";
import { SiteHeader } from "@/components/site-header";
import {
  achievements,
  experience,
  news,
  profile,
  projects,
  publications,
  researchInterests,
} from "@/data/portfolio";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  url: profile.siteUrl,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  sameAs: [profile.github, profile.linkedin, profile.x],
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader name={profile.name} />
      <main id="main-content">
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <div className="availability">
              <span /> {profile.availability}
            </div>
            <p className="eyebrow hero-kicker">
              ACADEMIC RESEARCHER <span>·</span> {profile.location.toUpperCase()}
            </p>
            <h1>
              Research for
              <br />
              <span className="hero-emphasis">public good.</span>
            </h1>
            <p className="hero-lede">{profile.headline}</p>
            <p className="hero-description">{profile.summary}</p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/research">
                Explore my research <ArrowDown size={15} />
              </Link>
              <Link className="button button-text" href="/publications">
                View publications <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="hero-social">
              <span>ACADEMIC LINKS</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Google Scholar"
              >
                <GraduationCap size={17} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <BriefcaseBusiness size={17} />
              </a>
              <a
                href={profile.x}
                target="_blank"
                rel="noreferrer"
                aria-label="ResearchGate"
              >
                <Microscope size={17} />
              </a>
              <i />
              <a className="cv-link" href="/cv.txt" download="academic-cv.txt">
                Download CV <ArrowDownToLine size={14} />
              </a>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Abstract illustration representing academic research and collaboration"
          >
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-sticker sticker-top">
              <span>RESEARCH →</span>
              <b>
                IMPACT
                <br />
                THROUGH
                <br />
                EVIDENCE
              </b>
            </div>
            <div className="visual-portrait">
              <div className="portrait-sun" />
              <div className="portrait-hair" />
              <div className="portrait-face">
                <span className="portrait-eye eye-left" />
                <span className="portrait-eye eye-right" />
                <span className="portrait-smile" />
              </div>
              <div className="portrait-neck" />
              <div className="portrait-body">
                <span className="portrait-shirt-detail" />
              </div>
              <div className="portrait-plant plant-one">
                <i />
                <i />
                <i />
              </div>
              <div className="portrait-plant plant-two">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="visual-sticker sticker-bottom">
              <span>WHO I WORK WITH</span>
              <b>
                UNIVERSITIES
                <br />
                POLICY
                <br />
                PRACTICE
              </b>
            </div>
            <div className="visual-code">
              <span>const</span> research = <b>&quot;collaboration&quot;</b>;
            </div>
          </div>

          <a href="#about" className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={14} />
          </a>
        </section>

        <MotionSection className="about-section section-shell" id="about">
          <div className="section-index">
            <span>01</span>
            <i /> ABOUT
          </div>
          <div className="about-layout">
            <div className="about-heading">
              <p className="eyebrow">ACADEMIC PROFILE</p>
              <h2>
                Leadership,
                <br />
                scholarship,
                <br />
                <em>and public impact.</em>
              </h2>
              <div className="about-stamp">
                <span>✳</span>
                <b>
                  RESEARCH
                  <br />
                  WITH PURPOSE
                </b>
              </div>
            </div>
            <div className="about-content">
              <p className="about-lede">
                {profile.name} is a lecturer and researcher committed to translating rigorous inquiry into practical change.
              </p>
              <p>{profile.summary}</p>
              <p>
                The work spans teaching, supervised research, institutional leadership, and collaborative projects designed to strengthen knowledge production across disciplines and communities.
              </p>
              <div className="currently-learning">
                <span className="learning-icon">↗</span>
                <div>
                  <span className="eyebrow">CURRENT RESEARCH FOCUS</span>
                  <p>{profile.headline}</p>
                </div>
              </div>
              <Link className="inline-link" href="/about">
                Read the academic profile <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="work-section section-shell" id="research">
          <div className="section-topline">
            <div>
              <div className="section-index">
                <span>02</span>
                <i /> RESEARCH AREAS
              </div>
              <h2>
                Research strengths<span className="accent-dot">.</span>
              </h2>
            </div>
            <p className="section-aside">
              Interdisciplinary work at the intersection of evidence, systems, and public value.
            </p>
          </div>

          <div className="project-grid">
            {researchInterests.map((interest) => (
              <article className="project-card" key={interest}>
                <div className="project-artwork artwork-mint" style={{ aspectRatio: "1.15" }}>
                  <div className="art-window" style={{ width: "72%", height: "68%" }}>
                    <div className="art-main">
                      <div className="art-topbar">
                        <span className="art-breadcrumb">Research theme</span>
                        <span className="art-topbar-icons">
                          <Sparkles size={12} />
                        </span>
                      </div>
                      <div className="art-dashboard">
                        <span className="art-eyebrow">INTERDISCIPLINARY</span>
                        <span className="art-title">{interest}</span>
                        <span className="art-subtitle">
                          Applied inquiry with public-interest relevance.
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="art-label">SPECIALISM</span>
                </div>
              </article>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="work-section section-shell" id="projects">
          <div className="section-topline">
            <div>
              <div className="section-index">
                <span>03</span>
                <i /> FEATURED PROJECTS
              </div>
              <h2>
                Research portfolio<span className="accent-dot">.</span>
              </h2>
            </div>
            <p className="section-aside">
              Selected projects designed to advance evidence, learning, and institutional improvement.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.slug}>
                <Link
                  className="project-image-link"
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${project.name} project page`}
                >
                  <ProjectArtwork project={project} />
                  <span className="project-open">
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
                <div className="project-meta">
                  <span>
                    {project.number} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span>{project.category}</span>
                </div>
                <div className="project-title-row">
                  <h3>
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  </h3>
                  <Link href={`/projects/${project.slug}`} aria-label={`Read more about ${project.name}`}>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
                <p>{project.summary}</p>
              </article>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="work-section section-shell" id="publications">
          <div className="section-topline">
            <div>
              <div className="section-index">
                <span>04</span>
                <i /> PUBLICATIONS
              </div>
              <h2>
                Recent scholarship<span className="accent-dot">.</span>
              </h2>
            </div>
            <Link className="button button-text" href="/publications">
              Browse all publications <ArrowRight size={15} />
            </Link>
          </div>

          <div className="project-grid">
            {publications.map((publication) => (
              <article className="project-card" key={publication.title}>
                <div className="project-artwork artwork-lavender" style={{ aspectRatio: "1.22" }}>
                  <div className="art-window" style={{ width: "76%", height: "70%" }}>
                    <div className="art-main">
                      <div className="art-topbar">
                        <span className="art-breadcrumb">{publication.type}</span>
                        <span className="art-topbar-icons">
                          <BookOpen size={12} />
                        </span>
                      </div>
                      <div className="art-dashboard">
                        <span className="art-eyebrow">{publication.year}</span>
                        <span className="art-title">{publication.title}</span>
                        <span className="art-subtitle">{publication.venue}</span>
                      </div>
                    </div>
                  </div>
                  <span className="art-label">{publication.status}</span>
                </div>
                <div className="project-meta">
                  <span>{publication.year}</span>
                  <span>{publication.type}</span>
                </div>
                <div className="project-title-row">
                  <h3>{publication.title}</h3>
                </div>
                <p>{publication.abstract}</p>
              </article>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="work-section section-shell" id="news">
          <div className="section-topline">
            <div>
              <div className="section-index">
                <span>05</span>
                <i /> LATEST NEWS
              </div>
              <h2>
                Academic activity<span className="accent-dot">.</span>
              </h2>
            </div>
          </div>
          <div className="project-grid">
            {news.map((item) => (
              <article className="project-card" key={item.title}>
                <div className="project-artwork artwork-peach" style={{ aspectRatio: "1.28" }}>
                  <div className="art-window" style={{ width: "72%", height: "72%" }}>
                    <div className="art-main">
                      <div className="art-topbar">
                        <span className="art-breadcrumb">Announcement</span>
                        <span className="art-topbar-icons">
                          <Building2 size={12} />
                        </span>
                      </div>
                      <div className="art-dashboard">
                        <span className="art-eyebrow">{item.date}</span>
                        <span className="art-title">{item.title}</span>
                        <span className="art-subtitle">{item.summary}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="about-section section-shell" id="achievements">
          <div className="section-index">
            <span>06</span>
            <i /> EXPERIENCE
          </div>
          <div className="about-layout">
            <div className="about-heading">
              <p className="eyebrow">PROFESSIONAL TRACK</p>
              <h2>
                Research-led
                <br />
                teaching,
                <br />
                <em>service, and leadership.</em>
              </h2>
            </div>
            <div className="about-content">
              {experience.map((item) => (
                <div key={item.role} className="currently-learning" style={{ display: "block", margin: "0 0 28px" }}>
                  <span className="eyebrow">{item.dates}</span>
                  <h3 style={{ margin: "10px 0 4px" }}>{item.role}</h3>
                  <p style={{ margin: "0 0 8px" }}>
                    <strong>{item.organization}</strong> · {item.location}
                  </p>
                  <ul style={{ margin: "0", paddingLeft: "18px", color: "var(--muted)" }}>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection className="work-section section-shell" id="contact">
          <div className="section-topline">
            <div>
              <div className="section-index">
                <span>07</span>
                <i /> CONTACT
              </div>
              <h2>
                Collaborate and connect<span className="accent-dot">.</span>
              </h2>
            </div>
          </div>
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">GET IN TOUCH</p>
              <h2>
                Opportunities in <em>research</em>, teaching, and partnerships.
              </h2>
              <p>
                I welcome briefings on collaborative projects, invited lectures, postgraduate supervision, and public-interest partnerships.
              </p>
              <div className="contact-email">
                <Mail size={16} />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="contact-socials">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  Google Scholar
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={profile.x} target="_blank" rel="noreferrer">
                  ResearchGate
                </a>
              </div>
              <div className="currently-learning" style={{ marginTop: "24px" }}>
                <span className="learning-icon">✦</span>
                <div>
                  <span className="eyebrow">KEY THEMES</span>
                  <p>{achievements[0]}</p>
                </div>
              </div>
            </div>
            <ContactForm email={profile.email} />
          </div>
        </MotionSection>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
