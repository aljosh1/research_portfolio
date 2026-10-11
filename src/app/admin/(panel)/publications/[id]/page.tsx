import { notFound } from "next/navigation";
import { deletePublicationAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { PublicationForm } from "@/components/admin/publication-form";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function EditPublication({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const pub = await db.publication.findUnique({ where: { id: (await params).id } });
  if (!pub) notFound();
  return (
    <>
      <div className="admin-title">
        <h1>Edit publication</h1>
        <DeleteButton action={deletePublicationAction.bind(null, pub.id)} confirm="Delete this publication permanently?" />
      </div>
      <PublicationForm pub={pub} />
    </>
  );
}