import { saveProfileAction } from "@/app/admin/actions";
import { ActionForm, Field } from "@/components/admin/action-form";
import { FileUpload } from "@/components/admin/file-upload";
import { requireUser } from "@/lib/auth";
import { getProfile } from "@/lib/queries";

export default async function ProfilePage() {
  await requireUser();
  const p = await getProfile();
  return (
    <>
      <div className="admin-title"><h1>Profile</h1></div>
      <ActionForm action={saveProfileAction} successMessage="Profile saved. The public site is updated.">
        <h2 className="form-section" style={{ marginTop: 0 }}>Identity</h2>
        <div className="form-grid">
          <Field name="fullName" label="Full name" defaultValue={p.fullName} required />
          <Field name="title" label="Academic title / position" defaultValue={p.title} required hint="e.g. Senior Lecturer" />
          <Field name="university" label="University" defaultValue={p.university} />
          <Field name="department" label="Department" defaultValue={p.department} />
          <Field name="faculty" label="Faculty / school" defaultValue={p.faculty} />
          <Field name="location" label="Location" defaultValue={p.location} />
          <Field name="headline" label="Headline" defaultValue={p.headline} required className="span-3" hint="One sentence describing your research focus." />
          <Field name="summary" label="Short biography" defaultValue={p.summary} required textarea={4} className="span-3" hint="Shown on the home page." />
        </div>
        <h2 className="form-section">Biography &amp; teaching</h2>
        <Field name="biography" label="Full biography" defaultValue={p.biography} textarea={8} hint="Separate paragraphs with a blank line." />
        <Field name="teachingPhilosophy" label="Teaching philosophy" defaultValue={p.teachingPhilosophy} textarea={5} />
        <Field name="supervisionInterests" label="Supervision interests" defaultValue={p.supervisionInterests} textarea={4} />
        <div className="form-grid">
          <Field name="researchInterests" label="Research interests" defaultValue={p.researchInterests.join(", ")} textarea={3} className="span-2" hint="Separate with commas or new lines." />
          <Field name="keywords" label="Keywords" defaultValue={p.keywords.join(", ")} textarea={3} />
        </div>
        <h2 className="form-section">Contact</h2>
        <div className="form-grid">
          <Field name="email" label="Public email" type="email" defaultValue={p.email} />
          <Field name="phone" label="Phone" defaultValue={p.phone} />
          <Field name="availability" label="Availability" defaultValue={p.availability} hint="e.g. Office hours Tue 2–4pm" />
        </div>
        <h2 className="form-section">Scholarly links</h2>
        <div className="form-grid">
          <Field name="scholarUrl" label="Google Scholar URL" defaultValue={p.scholarUrl} />
          <Field name="orcidUrl" label="ORCID URL" defaultValue={p.orcidUrl} />
          <Field name="researchGateUrl" label="ResearchGate URL" defaultValue={p.researchGateUrl} />
          <Field name="linkedinUrl" label="LinkedIn URL" defaultValue={p.linkedinUrl} />
        </div>
        <h2 className="form-section">Files</h2>
        <FileUpload name="portraitUrl" label="Portrait photo" kind="image" defaultValue={p.portraitUrl} hint="JPG, PNG or WebP, up to 5 MB." />
        <FileUpload name="cvUrl" label="CV (PDF)" kind="pdf" defaultValue={p.cvUrl} hint="Publicly downloadable from the home page. Up to 25 MB." />
      </ActionForm>
    </>
  );
}