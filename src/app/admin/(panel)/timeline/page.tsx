import Link from "next/link";
import { Flash } from "@/components/admin/flash";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { timelineKindLabels } from "@/lib/labels";
import { yearRange } from "@/lib/utils";

export default async function AdminTimeline({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  await requireUser();
  const sp = await searchParams;
  const items = await db.timelineEntry.findMany({ orderBy: [{ kind: "asc" }, { sortOrder: "asc" }, { startYear: "desc" }] });
  return (
    <>
      <div className="admin-title"><h1>Education &amp; career</h1><Link className="btn btn-primary" href="/admin/timeline/new">Add entry</Link></div>
      <p className="muted">Qualifications, appointments, awards, memberships and service shown on the About page.</p>
      <Flash {...sp} />
      {items.length ? (
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Category</th><th>Title</th><th>Years</th><th /></tr></thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td>{timelineKindLabels[t.kind]}</td>
                  <td><b>{t.title}</b><div className="muted">{t.organization}</div></td>
                  <td>{yearRange(t.startYear, t.endYear, t.current)}</td>
                  <td><div className="row-actions"><Link className="btn btn-outline btn-sm" href={`/admin/timeline/${t.id}`}>Edit</Link></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (<p className="empty">No entries yet.</p>)}
    </>
  );
}