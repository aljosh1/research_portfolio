import { changePasswordAction } from "@/app/admin/actions";
import { ActionForm, Field } from "@/components/admin/action-form";
import { requireUser } from "@/lib/auth";

export default async function Account() {
  await requireUser();
  return (
    <>
      <div className="admin-title"><h1>Change password</h1></div>
      <div className="form-card" style={{ maxWidth: 520 }}>
        <ActionForm action={changePasswordAction} submitLabel="Update password" successMessage="Password updated." stickyActions={false}>
          <Field name="current" label="Current password" type="password" autoComplete="current-password" required />
          <Field name="next" label="New password" type="password" autoComplete="new-password" required hint="At least 12 characters." />
          <Field name="confirm" label="Confirm new password" type="password" autoComplete="new-password" required />
        </ActionForm>
      </div>
    </>
  );
}