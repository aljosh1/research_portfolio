"use client";

import { createContext, useActionState, useContext, startTransition } from "react";
import type { FormState } from "@/lib/validation";

const Ctx = createContext<FormState>(undefined);

type Action = (state: FormState, formData: FormData) => Promise<FormState>;

/** Submits through a server action without React resetting the inputs when validation fails. */
export function ActionForm({
  action,
  children,
  className,
  submitLabel = "Save",
  successMessage = "Saved.",
  stickyActions = true,
  extra,
}: {
  action: Action;
  children: React.ReactNode;
  className?: string;
  submitLabel?: string;
  successMessage?: string;
  stickyActions?: boolean;
  extra?: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <Ctx.Provider value={state}>
      <form
        className={className}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          startTransition(() => formAction(data));
        }}
      >
        {state?.error && <div className="alert alert-error" role="alert">{state.error}</div>}
        {state?.ok && <div className="alert alert-ok" role="status">{successMessage}</div>}
        {children}
        <div className={stickyActions ? "sticky-actions" : undefined} style={stickyActions ? undefined : { marginTop: 8 }}>
          <button className="btn btn-primary" type="submit" disabled={pending}>
            {pending ? "Saving…" : submitLabel}
          </button>
          {extra}
        </div>
      </form>
    </Ctx.Provider>
  );
}

type FieldProps = {
  name: string;
  label: string;
  hint?: string;
  type?: string;
  defaultValue?: string | number | null;
  textarea?: number;
  required?: boolean;
  className?: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
};

export function Field({ name, label, hint, type = "text", defaultValue, textarea, required, className, options, placeholder, autoComplete, maxLength }: FieldProps) {
  const state = useContext(Ctx);
  const error = state?.fieldErrors?.[name];
  const id = `f-${name}`;
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
  const common = { id, name, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, required, placeholder, maxLength };
  return (
    <div className={`field ${className ?? ""}`}>
      <label htmlFor={id}>{label}{required ? " *" : ""}</label>
      {options ? (
        <select className="select" defaultValue={String(defaultValue ?? "")} {...common}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : textarea ? (
        <textarea className="textarea" rows={textarea} defaultValue={defaultValue ?? ""} {...common} />
      ) : (
        <input className="input" type={type} defaultValue={defaultValue ?? ""} autoComplete={autoComplete} {...common} />
      )}
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
      {error && <span className="field-error" id={`${id}-err`}>{error}</span>}
    </div>
  );
}

export function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="check" style={{ marginBottom: 14 }}>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} /> {label}
    </label>
  );
}