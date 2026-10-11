import { ProjectForm } from "@/components/admin/project-form";
import { requireUser } from "@/lib/auth";

export default async function NewProject() {
  await requireUser();
  return (<><div className="admin-title"><h1>Add project</h1></div><ProjectForm /></>);
}