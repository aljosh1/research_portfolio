import { saveTimelineAction } from "@/app/admin/actions";
import { ActionForm, Check, Field } from "@/components/admin/action-form";
import type { TimelineEntry } from "@/generated/prisma/client";
import { timelineKindLabels, timelineKinds } from "@/lib/labels";

export function TimelineForm({ entry }: { entry?: TimelineEntry }) {
  const action = saveTimelineAction.bind(null, entry?.id ?? null);
  return (
    <ActionForm action={action} submitLabel={entry ? "Save changes" : "Add entry"}>
      <div className="form-grid">
        <Field name="kind" label="Category" defaultValue={entry?.kind ?? "QUALIFICATION"} options={timelineKinds.map((k) => ({ value: k, label: timelineKindLabels[k] }))} />
        <Field name="title" label="Title" defaultValue={entry?.title} required className="span-2" hint="e.g. PhD in Physics, or Senior Lecturer" />
        <Field name="organization" label="Institution / organisation" defaultValue={entry?.organization} className="span-2" />
        <Field name="location" label="Location" defaultValue={entry?.location} />
        <Field name="startYear" label="Start year" defaultValue={entry?.startYear} maxLength={4} />
        <Field name="endYear" label="End year" defaultValue={entry?.endYear} maxLength={4} />
        <Field name="sortOrder" label="Display order" type="number" defaultValue={entry?.sortOrder ?? 0} hint="Lower numbers appear first within a category." />
        <Field name="description" label="Details" defaultValue={entry?.description} textarea={4} className="span-3" />
      </div>
      <Check name="current" label="Current position (shows “Present”)" defaultChecked={entry?.current} />
    </ActionForm>
  );
}