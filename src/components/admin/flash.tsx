export function Flash({ saved, deleted }: { saved?: string; deleted?: string }) {
  if (saved) return <div className="alert alert-ok" role="status">Saved successfully.</div>;
  if (deleted) return <div className="alert alert-ok" role="status">Deleted.</div>;
  return null;
}