import { notFound } from "next/navigation";
import { deleteProjectAction } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { ProjectForm } from "@/components/admin/project-form";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const project = await db.project.findUnique({ where: { id: (await params).id } });
  if (!project) notFound();
  return (
    <>
      <div className="admin-title"><h1>Edit project</h1><DeleteButton action={deleteProjectAction.bind(null, project.id)} confirm="Delete this project permanently?" /></div>
      <ProjectForm project={project} />
    </>
  );
}