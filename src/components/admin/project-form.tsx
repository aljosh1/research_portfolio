import { saveProjectAction } from "@/app/admin/actions";
import { ActionForm, Check, Field } from "@/components/admin/action-form";
import { FileUpload } from "@/components/admin/file-upload";
import type { Project } from "@/generated/prisma/client";
import { projectStatusLabels, projectStatuses } from "@/lib/labels";

export function ProjectForm({ project }: { project?: Project }) {
  const action = saveProjectAction.bind(null, project?.id ?? null);
  return (
    <ActionForm action={action} submitLabel={project ? "Save changes" : "Add project"}>
      <div className="form-grid">
        <Field name="title" label="Title" defaultValue={project?.title} required className="span-2" />
        <Field name="status" label="Status" defaultValue={project?.status ?? "ONGOING"} options={projectStatuses.map((s) => ({ value: s, label: projectStatusLabels[s] }))} />
        <Field name="summary" label="Summary" defaultValue={project?.summary} required textarea={3} className="span-3" hint="Shown on cards (max 600 characters)." />
        <Field name="description" label="Full description" defaultValue={project?.description} textarea={9} className="span-3" hint="Separate paragraphs with a blank line." />
        <Field name="startYear" label="Start year" defaultValue={project?.startYear} maxLength={4} />
        <Field name="endYear" label="End year" defaultValue={project?.endYear} maxLength={4} />
        <Field name="sortOrder" label="Display order" type="number" defaultValue={project?.sortOrder ?? 0} hint="Lower numbers appear first." />
        <Field name="funder" label="Funder" defaultValue={project?.funder} />
        <Field name="collaborators" label="Collaborators" defaultValue={project?.collaborators} className="span-2" />
        <Field name="outcomes" label="Outcomes" defaultValue={project?.outcomes} textarea={4} className="span-3" />
        <Field name="keywords" label="Keywords" defaultValue={project?.keywords.join(", ")} className="span-2" />
        <Field name="externalUrl" label="Project website" defaultValue={project?.externalUrl} />
      </div>
      <FileUpload name="imageUrl" label="Project image" kind="image" defaultValue={project?.imageUrl} />
      <Field name="imageAlt" label="Image description (for screen readers)" defaultValue={project?.imageAlt} />
      <Check name="featured" label="Feature on the home page" defaultChecked={project?.featured} />
      <Check name="published" label="Visible on the public website" defaultChecked={project ? project.published : true} />
    </ActionForm>
  );
}