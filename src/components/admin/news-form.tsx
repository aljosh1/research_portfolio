import { saveNewsAction } from "@/app/admin/actions";
import { ActionForm, Check, Field } from "@/components/admin/action-form";
import type { NewsItem } from "@/generated/prisma/client";

export function NewsForm({ item }: { item?: NewsItem }) {
  const action = saveNewsAction.bind(null, item?.id ?? null);
  return (
    <ActionForm action={action} submitLabel={item ? "Save changes" : "Post news"}>
      <div className="form-grid">
        <Field name="title" label="Title" defaultValue={item?.title} required className="span-2" />
        <Field name="date" label="Date" type="date" defaultValue={(item?.date ?? new Date()).toISOString().slice(0, 10)} required />
        <Field name="summary" label="Summary" defaultValue={item?.summary} required textarea={3} className="span-3" />
        <Field name="body" label="Full text" defaultValue={item?.body} textarea={8} className="span-3" hint="Optional. Separate paragraphs with a blank line." />
      </div>
      <Check name="published" label="Visible on the public website" defaultChecked={item ? item.published : true} />
    </ActionForm>
  );
}