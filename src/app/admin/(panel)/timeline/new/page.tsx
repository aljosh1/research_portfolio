import { TimelineForm } from "@/components/admin/timeline-form";
import { requireUser } from "@/lib/auth";

export default async function NewTimeline() {
  await requireUser();
  return (<><div className="admin-title"><h1>Add entry</h1></div><TimelineForm /></>);
}