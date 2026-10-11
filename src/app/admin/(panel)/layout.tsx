import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { logoutAction } from "@/app/admin/actions";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const unread = await db.message.count({ where: { read: false } });
  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="brand"><span className="brand-mark" aria-hidden>A</span> Site admin</div>
        <AdminNav unread={unread} isAdmin={user.role === "ADMIN"} />
        <div className="admin-user">
          <div style={{ marginBottom: 10 }}>
            {user.name}<br /><span style={{ opacity: 0.7 }}>{user.email} · {user.role.toLowerCase()}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/" className="btn btn-outline btn-sm" style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }} target="_blank">View site</Link>
            <form action={logoutAction}><button className="btn btn-gold btn-sm" type="submit">Sign out</button></form>
          </div>
        </div>
      </aside>
      <main id="main" className="admin-main">{children}</main>
    </div>
  );
}