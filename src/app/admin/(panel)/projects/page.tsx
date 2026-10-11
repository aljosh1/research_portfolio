import Link from "next/link";
import { Flash } from "@/components/admin/flash";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectStatusLabels } from "@/lib/labels";

export default async function AdminProjects({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  await requireUser();
  const sp = await searchParams;
  const items = await db.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return (
    <>
      <div className="admin-title"><h1>Research projects</h1><Link className="btn btn-primary" href="/admin/projects/new">Add project</Link></div>
      <Flash {...sp} />
      {items.length ? (
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Title</th><th>Status</th><th>Visibility</th><th /></tr></thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td><b>{p.title}</b><div className="muted">{p.summary}</div></td>
                  <td>{projectStatusLabels[p.status]}</td>
                  <td><span className={`badge ${p.published ? "badge-ok" : "badge-muted"}`}>{p.published ? "Public" : "Hidden"}</span></td>
                  <td><div className="row-actions"><Link className="btn btn-outline btn-sm" href={`/admin/projects/${p.id}`}>Edit</Link></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (<p className="empty">No projects yet.</p>)}
    </>
  );
}