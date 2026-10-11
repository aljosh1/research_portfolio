import { notFound } from "next/navigation";
import { deleteNewsAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { NewsForm } from "@/components/admin/news-form";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function EditNews({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const item = await db.newsItem.findUnique({ where: { id: (await params).id } });
  if (!item) notFound();
  return (
    <>
      <div className="admin-title"><h1>Edit news</h1><DeleteButton action={deleteNewsAction.bind(null, item.id)} confirm="Delete this news item?" /></div>
      <NewsForm item={item} />
    </>
  );
}