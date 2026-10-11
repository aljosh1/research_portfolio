"use client";

export function DeleteButton({ action, label = "Delete", confirm: message = "Delete this item permanently?" }: { action: () => Promise<void>; label?: string; confirm?: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      <button type="submit" className="btn btn-danger btn-sm">{label}</button>
    </form>
  );
}