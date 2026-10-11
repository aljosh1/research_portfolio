import type { TimelineEntry } from "@/generated/prisma/client";
import { yearRange } from "@/lib/utils";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="timeline">
      {entries.map((e) => (
        <li key={e.id}>
          <div className="timeline-years">{yearRange(e.startYear, e.endYear, e.current)}</div>
          <h3>{e.title}</h3>
          {(e.organization || e.location) && (
            <div className="muted">{[e.organization, e.location].filter(Boolean).join(" · ")}</div>
          )}
          {e.description && <p style={{ marginTop: 6 }}>{e.description}</p>}
        </li>
      ))}
    </ol>
  );
}