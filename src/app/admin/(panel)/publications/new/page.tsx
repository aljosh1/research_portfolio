import { PublicationForm } from "@/components/admin/publication-form";
import { requireUser } from "@/lib/auth";

export default async function NewPublication() {
  await requireUser();
  return (<><div className="admin-title"><h1>Add publication</h1></div><PublicationForm /></>);
}