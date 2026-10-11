import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { achievements, education, experience, profile, researchInterests } from "@/data/portfolio";

export const metadata = {
  title: "Academic profile",
  description: `Overview of ${profile.name}'s research interests, academic history, and contribution to teaching and leadership.`,
};

export default function AboutPage() {
  return (
    <main className="detail-page section-shell" style={{ paddingBottom: 72 }}>
      <div className="detail-topbar" style={{ marginTop: 28 }}>
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to homepage
        </Link>
        <span>ACADEMIC PROFILE</span>
      </div>

      <section className="detail-hero" style={{ paddingTop: 28 }}>
        <p className="eyebrow">{profile.role}</p>
        <h1>
          {profile.name}
          <span className="accent-dot">.</span>
        </h1>
        <p>{profile.summary}</p>
      </section>

      <section className="detail-content" style={{ marginTop: 32 }}>
        <div className="detail-copy">
          <p className="eyebrow">RESEARCH INTERESTS</p>
          <h2>Areas of specialisation.</h2>
        </div>
        <div className="detail-sections">
          {researchInterests.map((interest, index) => (
            <article key={interest}>
              <h3>{String(index + 1).padStart(2, "0")} / {interest}</h3>
              <p>
                This area informs the lecturer&apos;s teaching, supervision, and collaborative research agenda across disciplinary and institutional boundaries.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-content" style={{ marginTop: 32 }}>
        <div className="detail-copy">
          <p className="eyebrow">QUALIFICATIONS</p>
          <h2>Academic history.</h2>
        </div>
        <div className="detail-sections">
          {education.map((item) => (
            <article key={item.qualification}>
              <h3>{item.qualification}</h3>
              <p>
                <strong>{item.organization}</strong> · {item.dates}
              </p>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-content" style={{ marginTop: 32 }}>
        <div className="detail-copy">
          <p className="eyebrow">LEADERSHIP</p>
          <h2>Professional contribution.</h2>
        </div>
        <div className="detail-sections">
          {experience.map((role) => (
            <article key={role.role}>
              <h3>{role.role}</h3>
              <p>
                <strong>{role.organization}</strong> · {role.location} · {role.dates}
              </p>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {role.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-content" style={{ marginTop: 32 }}>
        <div className="detail-copy">
          <p className="eyebrow">ACHIEVEMENTS</p>
          <h2>Selected highlights.</h2>
        </div>
        <div className="detail-sections">
          {achievements.map((achievement, index) => (
            <article key={achievement}>
              <h3>{String(index + 1).padStart(2, "0")} / Achievement</h3>
              <p>{achievement}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="detail-footer" style={{ marginTop: 42 }}>
        <Link href="/">
          <ArrowLeft size={15} /> Home
        </Link>
        <Link href="/publications">
          Browse publications <ArrowUpRight size={15} />
        </Link>
      </footer>
    </main>
  );
}
