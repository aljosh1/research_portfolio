import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { getProfile } from "@/lib/queries";

export const metadata: Metadata = { title: "Contact", description: "Get in touch for collaboration, supervision or speaking invitations." };

export default async function ContactPage() {
  const profile = await getProfile();
  return (
    <section className="section">
      <div className="container detail-layout" style={{ paddingBlock: 0 }}>
        <div>
          <span className="eyebrow">Contact</span>
          <h2 style={{ fontSize: 38, color: "var(--navy)", marginBottom: 16 }}>Get in touch</h2>
          <p className="lede" style={{ marginBottom: 28 }}>
            For research collaboration, postgraduate supervision, speaking invitations or consultancy.
          </p>
          <ContactForm />
        </div>
        <aside className="facts">
          <dl>
            {profile.email && (<><dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></>)}
            {profile.phone && (<><dt>Phone</dt><dd>{profile.phone}</dd></>)}
            {(profile.department || profile.university) && (
              <><dt>Affiliation</dt><dd>{[profile.department, profile.faculty, profile.university].filter(Boolean).join(", ")}</dd></>
            )}
            {profile.location && (<><dt>Location</dt><dd>{profile.location}</dd></>)}
            {profile.availability && (<><dt>Availability</dt><dd>{profile.availability}</dd></>)}
          </dl>
          {!profile.email && !profile.university && <p className="muted">Contact details can be added in the admin dashboard.</p>}
        </aside>
      </div>
    </section>
  );
}