import { savePublicationAction } from "@/app/admin/actions";
import { ActionForm, Check, Field } from "@/components/admin/action-form";
import { FileUpload } from "@/components/admin/file-upload";
import type { Publication } from "@/generated/prisma/client";
import { publicationStatusLabels, publicationStatuses, publicationTypeLabels, publicationTypes } from "@/lib/labels";

export function PublicationForm({ pub }: { pub?: Publication }) {
  const action = savePublicationAction.bind(null, pub?.id ?? null);
  return (
    <ActionForm action={action} submitLabel={pub ? "Save changes" : "Add publication"}>
      <div className="form-grid">
        <Field name="title" label="Title" defaultValue={pub?.title} required className="span-3" />
        <Field name="authors" label="Authors" defaultValue={pub?.authors.join("\n")} textarea={4} required className="span-2" hint="One author per line, in order. e.g. Jane Q. Doe" />
        <div>
          <Field name="year" label="Year" defaultValue={pub?.year ?? new Date().getFullYear()} required maxLength={4} />
          <Field name="type" label="Type" defaultValue={pub?.type ?? "JOURNAL_ARTICLE"} options={publicationTypes.map((t) => ({ value: t, label: publicationTypeLabels[t] }))} />
          <Field name="status" label="Status" defaultValue={pub?.status ?? "PUBLISHED"} options={publicationStatuses.map((s) => ({ value: s, label: publicationStatusLabels[s] }))} />
        </div>
        <Field name="venue" label="Journal / conference / book title" defaultValue={pub?.venue} className="span-2" />
        <Field name="publisher" label="Publisher" defaultValue={pub?.publisher} />
        <Field name="volume" label="Volume" defaultValue={pub?.volume} />
        <Field name="issue" label="Issue" defaultValue={pub?.issue} />
        <Field name="pages" label="Pages" defaultValue={pub?.pages} hint="e.g. 123–145" />
        <Field name="articleNumber" label="Article number" defaultValue={pub?.articleNumber} />
        <Field name="doi" label="DOI" defaultValue={pub?.doi} hint="e.g. 10.1234/abcd" />
        <Field name="isbn" label="ISBN" defaultValue={pub?.isbn} />
        <Field name="issn" label="ISSN" defaultValue={pub?.issn} />
        <Field name="externalUrl" label="Publisher / external link" defaultValue={pub?.externalUrl} />
        <Field name="subject" label="Subject / research area" defaultValue={pub?.subject} hint="Used for the subject filter." />
        <Field name="keywords" label="Keywords" defaultValue={pub?.keywords.join(", ")} className="span-2" hint="Comma separated." />
        <Field name="license" label="License" defaultValue={pub?.license} hint="e.g. CC BY 4.0" />
        <Field name="abstract" label="Abstract" defaultValue={pub?.abstract} textarea={7} className="span-3" />
      </div>
      <h2 className="form-section">Files &amp; visibility</h2>
      <FileUpload name="pdfUrl" label="Full-text PDF" kind="pdf" visibility="private" defaultValue={pub?.pdfUrl} hint="Stored privately. Visitors can only download it if you tick the box below." />
      <FileUpload name="coverUrl" label="Cover image" kind="image" defaultValue={pub?.coverUrl} />
      <Check name="allowDownload" label="Allow visitors to download the PDF (only tick if the publisher permits it)" defaultChecked={pub?.allowDownload} />
      <Check name="openAccess" label="Open access" defaultChecked={pub?.openAccess} />
      <Check name="featured" label="Feature on the home page" defaultChecked={pub?.featured} />
      <Check name="published" label="Visible on the public website" defaultChecked={pub ? pub.published : true} />
    </ActionForm>
  );
}