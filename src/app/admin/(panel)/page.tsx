import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await requireUser();
  const { denied } = await searchParams;
  const [pubs, drafts, projects, news, unread, messages, profile] = await Promise.all([
    db.publication.count(),
    db.publication.count({ where: { published: false } }),
    db.project.count(),
    db.newsItem.count(),
    db.message.count({ where: { read: false } }),
    db.message.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    db.profile.findUnique({ where: { id: "main" } }),
  ]);
  return (
    <>
      <div className="admin-title"><h1>Welcome, {user.name}</h1></div>
      {denied && <div className="alert alert-error" role="alert">That area is for administrators only.</div>}
      {!profile && (
        <div className="alert alert-error">
          Your public profile is still empty. <Link href="/admin/profile"><b>Fill in your profile</b></Link> so the website shows your details.
        </div>
      )}
      <div className="stats">
        <div className="stat"><b>{pubs}</b>Publications{drafts ? ` (${drafts} hidden)` : ""}</div>
        <div className="stat"><b>{projects}</b>Research projects</div>
        <div className="stat"><b>{news}</b>News items</div>
        <div className="stat"><b>{unread}</b>Unread messages</div>
      </div>
      <div className="section-head" style={{ marginBottom: 16 }}><h2 style={{ fontSize: 22 }}>Quick actions</h2></div>
      <div className="hero-actions" style={{ marginTop: 0 }}>
        <Link className="btn btn-primary" href="/admin/publications/new">Add publication</Link>
        <Link className="btn btn-outline" href="/admin/projects/new">Add project</Link>
        <Link className="btn btn-outline" href="/admin/news/new">Post news</Link>
        <Link className="btn btn-outline" href="/admin/profile">Edit profile</Link>
      </div>
      <div className="section-head" style={{ margin: "32px 0 16px" }}><h2 style={{ fontSize: 22 }}>Recent messages</h2></div>
      {messages.length ? (
        messages.map((m) => (
          <Link key={m.id} href="/admin/messages" className={`message-card${m.read ? "" : " unread"}`} style={{ display: "block" }}>
            <b>{m.name}</b> · {m.topic} <span className="muted">· {formatDate(m.createdAt)}</span>
            <div className="muted" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</div>
          </Link>
        ))
      ) : (
        <p className="empty">No messages yet.</p>
      )}
    </>
  );
}