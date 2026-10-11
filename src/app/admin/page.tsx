import Link from "next/link";
import { ArrowLeft, PencilLine, ShieldCheck, Upload, Users } from "lucide-react";

export const metadata = {
  title: "Admin dashboard",
  description: "Content management dashboard for the academic portfolio website.",
};

const modules = [
  {
    title: "Profile and biography",
    description: "Update name, role, biography, academic affiliations, and contact details.",
    icon: Users,
  },
  {
    title: "Research projects",
    description: "Add project summaries, grant context, collaborators, and project status updates.",
    icon: ShieldCheck,
  },
  {
    title: "Publications",
    description: "Manage scholarly outputs, DOI links, keywords, and featured publications.",
    icon: PencilLine,
  },
  {
    title: "Media and files",
    description: "Upload CVs, portraits, publication PDFs, and other research resources.",
    icon: Upload,
  },
];

export default function AdminPage() {
  return (
    <main className="detail-page section-shell" style={{ paddingBottom: 88 }}>
      <div className="detail-topbar" style={{ marginTop: 28 }}>
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to homepage
        </Link>
        <span>ADMIN DASHBOARD</span>
      </div>

      <section className="detail-hero" style={{ paddingTop: 32 }}>
        <p className="eyebrow">CONTENT MANAGEMENT</p>
        <h1>
          Edit the academic portfolio
          <span className="accent-dot">.</span>
        </h1>
        <p>
          This dashboard is designed for non-technical updates to biography, publications, projects, media, and public-facing research updates.
        </p>
      </section>

      <div className="project-grid" style={{ marginTop: 36 }}>
        {modules.map(({ title, description, icon: Icon }) => (
          <article className="project-card" key={title}>
            <div className="project-artwork artwork-mint" style={{ aspectRatio: "1.2" }}>
              <div className="art-window" style={{ width: "74%", height: "68%" }}>
                <div className="art-main">
                  <div className="art-topbar">
                    <span className="art-breadcrumb">Module</span>
                    <span className="art-topbar-icons">
                      <Icon size={12} />
                    </span>
                  </div>
                  <div className="art-dashboard">
                    <span className="art-eyebrow">EDITABLE</span>
                    <span className="art-title">{title}</span>
                    <span className="art-subtitle">{description}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
