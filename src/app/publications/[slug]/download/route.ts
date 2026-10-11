import { db } from "@/lib/db";
import { PRIVATE_PREFIX, readLocalFile } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Serves a publication PDF only when the record is published and downloads are explicitly permitted. */
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const publication = await db.publication.findFirst({
    where: { slug, published: true, allowDownload: true, NOT: { pdfUrl: "" } },
    select: { pdfUrl: true },
  });
  if (!publication) return new Response("Not found", { status: 404 });

  const { pdfUrl } = publication;
  if (/^https?:\/\//.test(pdfUrl)) return Response.redirect(pdfUrl, 302);

  const name = pdfUrl.startsWith(PRIVATE_PREFIX)
    ? pdfUrl.slice(PRIVATE_PREFIX.length)
    : pdfUrl.replace(/^\/files\//, "");
  const file = await readLocalFile(pdfUrl.startsWith(PRIVATE_PREFIX) ? "private" : "public", name);
  if (!file) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(file.data), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
