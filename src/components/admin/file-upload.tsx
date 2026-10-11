"use client";

import { useRef, useState } from "react";

export function FileUpload({
  name,
  label,
  kind,
  visibility = "public",
  defaultValue = "",
  hint,
}: {
  name: string;
  label: string;
  kind: "image" | "pdf";
  visibility?: "public" | "private";
  defaultValue?: string;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const id = `u-${name}`;

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    const body = new FormData();
    body.set("file", file);
    body.set("kind", kind);
    body.set("visibility", visibility);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { url?: string; message?: string };
      if (res.ok && data.url) setUrl(data.url);
      else setError(data.message ?? "Upload failed.");
    } catch {
      setError("Upload failed. Check your connection.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  const isPublicImage = kind === "image" && url && !url.startsWith("local-private:");
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="upload">
        {isPublicImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="upload-preview" src={url} alt="" />
        )}
        {kind === "pdf" && url && <span className="badge badge-ok">PDF attached</span>}
        <input
          ref={input}
          id={id}
          type="file"
          accept={kind === "image" ? "image/jpeg,image/png,image/webp" : "application/pdf"}
          onChange={onChange}
          disabled={busy}
        />
        {url && (
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setUrl("")}>
            Remove
          </button>
        )}
      </div>
      {busy && <span className="hint" role="status">Uploading…</span>}
      {hint && <span className="hint">{hint}</span>}
      {error && <span className="field-error" role="alert">{error}</span>}
    </div>
  );
}