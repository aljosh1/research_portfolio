import Link from "next/link";
import { Flash } from "@/components/admin/flash";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { publicationTypeLabels } from "@/lib/labels";

export default async function AdminPublications({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  await requireUser();
  const sp = await searchParams;
  const items = await db.publication.findMany({ orderBy: [{ year: "desc" }, { createdAt: "desc" }] });
  return (
    <>
      <div className="admin-title"><h1>Publications</h1><Link className="btn btn-primary" href="/admin/publications/new">Add publication</Link></div>
      <Flash {...sp} />
      {items.length ? (
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Title</th><th>Year</th><th>Type</th><th>Visibility</th><th /></tr></thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td><b>{p.title}</b><div className="muted">{p.authors.join(", ")}</div></td>
                  <td>{p.year}</td>
                  <td>{publicationTypeLabels[p.type]}</td>
                  <td>
                    <span className={`badge ${p.published ? "badge-ok" : "badge-muted"}`}>{p.published ? "Public" : "Hidden"}</span>{" "}
                    {p.featured && <span className="badge">Featured</span>}
                  </td>
                  <td><div className="row-actions"><Link className="btn btn-outline btn-sm" href={`/admin/publications/${p.id}`}>Edit</Link></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty">No publications yet. Add your first one.</p>
      )}
    </>
  );
}