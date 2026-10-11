import { deleteMessageAction, toggleMessageReadAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function Messages() {
  await requireUser();
  const items = await db.message.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return (
    <>
      <div className="admin-title"><h1>Messages</h1></div>
      {items.length ? items.map((m) => (
        <article key={m.id} className={`message-card${m.read ? "" : " unread"}`}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <b>{m.name}</b> · <a href={`mailto:${m.email}`}>{m.email}</a>
              <div className="muted">{m.topic} · {formatDate(m.createdAt)} {!m.read && <span className="badge">New</span>}</div>
            </div>
            <div className="row-actions">
              <form action={toggleMessageReadAction.bind(null, m.id, !m.read)}>
                <button className="btn btn-outline btn-sm" type="submit">{m.read ? "Mark unread" : "Mark read"}</button>
              </form>
              <DeleteButton action={deleteMessageAction.bind(null, m.id)} confirm="Delete this message?" />
            </div>
          </div>
          <p className="message-body" style={{ marginTop: 12, marginBottom: 0 }}>{m.message}</p>
        </article>
      )) : <p className="empty">No messages yet.</p>}
    </>
  );
}