import Link from "next/link";
import { Flash } from "@/components/admin/flash";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminNews({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  await requireUser();
  const sp = await searchParams;
  const items = await db.newsItem.findMany({ orderBy: { date: "desc" } });
  return (
    <>
      <div className="admin-title"><h1>News</h1><Link className="btn btn-primary" href="/admin/news/new">Post news</Link></div>
      <Flash {...sp} />
      {items.length ? (
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Title</th><th>Date</th><th>Visibility</th><th /></tr></thead>
            <tbody>
              {items.map((n) => (
                <tr key={n.id}>
                  <td><b>{n.title}</b></td><td>{formatDate(n.date)}</td>
                  <td><span className={`badge ${n.published ? "badge-ok" : "badge-muted"}`}>{n.published ? "Public" : "Hidden"}</span></td>
                  <td><div className="row-actions"><Link className="btn btn-outline btn-sm" href={`/admin/news/${n.id}`}>Edit</Link></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (<p className="empty">No news yet.</p>)}
    </>
  );
}