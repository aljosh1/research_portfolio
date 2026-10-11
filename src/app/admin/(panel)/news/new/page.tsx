import { NewsForm } from "@/components/admin/news-form";
import { requireUser } from "@/lib/auth";

export default async function NewNews() {
  await requireUser();
  return (<><div className="admin-title"><h1>Post news</h1></div><NewsForm /></>);
}