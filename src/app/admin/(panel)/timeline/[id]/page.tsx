import { notFound } from "next/navigation";
import { deleteTimelineAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { TimelineForm } from "@/components/admin/timeline-form";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function EditTimeline({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const entry = await db.timelineEntry.findUnique({ where: { id: (await params).id } });
  if (!entry) notFound();
  return (
    <>
      <div className="admin-title"><h1>Edit entry</h1><DeleteButton action={deleteTimelineAction.bind(null, entry.id)} confirm="Delete this entry?" /></div>
      <TimelineForm entry={entry} />
    </>
  );
}