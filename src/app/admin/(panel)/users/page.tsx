import { createUserAction, deleteUserAction } from "@/app/admin/actions";
import { ActionForm, Field } from "@/components/admin/action-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function UsersPage() {
  const me = await requireAdmin();
  const users = await db.user.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <>
      <div className="admin-title"><h1>Users</h1></div>
      <p className="muted">Admins can manage users. Editors can manage content only.</p>
      <div className="table-wrap" style={{ marginBottom: 32 }}>
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th /></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td><b>{u.name}</b></td><td>{u.email}</td>
                <td><span className="badge">{u.role}</span></td>
                <td>{u.id !== me.id && <div className="row-actions"><DeleteButton action={deleteUserAction.bind(null, u.id)} confirm={`Remove ${u.email}?`} /></div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="form-section" style={{ marginTop: 0 }}>Add a user</h2>
      <div className="form-card" style={{ maxWidth: 560 }}>
        <ActionForm action={createUserAction} submitLabel="Create user" successMessage="User created." stickyActions={false}>
          <Field name="name" label="Name" required />
          <Field name="email" label="Email" type="email" required autoComplete="off" />
          <Field name="role" label="Role" defaultValue="EDITOR" options={[{ value: "EDITOR", label: "Editor" }, { value: "ADMIN", label: "Admin" }]} />
          <Field name="password" label="Temporary password" type="password" required autoComplete="new-password" hint="At least 12 characters." />
        </ActionForm>
      </div>
    </>
  );
}