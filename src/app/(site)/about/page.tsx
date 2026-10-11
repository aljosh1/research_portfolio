import type { Metadata } from "next";
import { Paragraphs } from "@/components/paragraphs";
import { Timeline } from "@/components/timeline";
import { getProfile, getTimeline } from "@/lib/queries";
import { timelineKindLabels, timelineKinds } from "@/lib/labels";

export const metadata: Metadata = { title: "About", description: "Biography, education, appointments, teaching and service." };

export default async function AboutPage() {
  const [profile, timeline] = await Promise.all([getProfile(), getTimeline()]);
  return (
    <div className="container">
      <header className="detail-header" style={{ borderBottom: 0 }}>
        <span className="eyebrow">About</span>
        <h1 style={{ fontSize: "clamp(32px,4.5vw,48px)", color: "var(--navy)" }}>{profile.fullName}</h1>
        <p className="lede" style={{ marginTop: 12 }}>{profile.title}{profile.university ? `, ${profile.university}` : ""}</p>
      </header>

      <div className="two-col">
        <h2>Biography</h2>
        <div className="prose">
          <p style={{ fontSize: 18 }}>{profile.summary}</p>
          <Paragraphs text={profile.biography} />
        </div>
      </div>

      {profile.teachingPhilosophy && (
        <div className="two-col"><h2>Teaching philosophy</h2><div className="prose"><Paragraphs text={profile.teachingPhilosophy} /></div></div>
      )}
      {profile.supervisionInterests && (
        <div className="two-col"><h2>Supervision interests</h2><div className="prose"><Paragraphs text={profile.supervisionInterests} /></div></div>
      )}
      {profile.keywords.length > 0 && (
        <div className="two-col">
          <h2>Keywords</h2>
          <ul className="chips" style={{ padding: 0, listStyle: "none" }}>{profile.keywords.map((k) => <li key={k} className="chip">{k}</li>)}</ul>
        </div>
      )}

      {timelineKinds.map((kind) => {
        const entries = timeline.filter((t) => t.kind === kind);
        if (!entries.length) return null;
        return (
          <div className="two-col" key={kind}>
            <h2>{timelineKindLabels[kind]}</h2>
            <Timeline entries={entries} />
          </div>
        );
      })}
      <div style={{ height: 48 }} />
    </div>
  );
}