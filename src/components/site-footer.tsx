import Link from "next/link";
import type { getProfile } from "@/lib/queries";
import { safeUrl } from "@/lib/utils";

type Profile = Awaited<ReturnType<typeof getProfile>>;

export function SiteFooter({ profile }: { profile: Profile }) {
  const social = [
    ["Google Scholar", profile.scholarUrl],
    ["ORCID", profile.orcidUrl],
    ["ResearchGate", profile.researchGateUrl],
    ["LinkedIn", profile.linkedinUrl],
  ].filter(([, u]) => safeUrl(u));

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h2>{profile.fullName}</h2>
            <p>
              {profile.title}
              {profile.department ? <><br />{profile.department}</> : null}
              {profile.university ? <><br />{profile.university}</> : null}
            </p>
            {profile.email ? (
              <p>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            ) : null}
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/research">Research</Link></li>
              <li><Link href="/publications">Publications</Link></li>
              <li><Link href="/news">News</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2>Scholarly profiles</h2>
            {social.length ? (
              <ul>
                {social.map(([label, u]) => (
                  <li key={label}>
                    <a href={safeUrl(u)} target="_blank" rel="noopener noreferrer">{label}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">Add profile links in the admin dashboard.</p>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</span>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}