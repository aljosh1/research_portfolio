import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveUpload, UploadError, type UploadKind, type Visibility } from "@/lib/storage";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) return NextResponse.json({ message: "Not authorised." }, { status: 401 });
  if (!rateLimit(`upload:${user.id}`, 60, 60 * 60 * 1000).ok) {
    return NextResponse.json({ message: "Upload limit reached. Try again later." }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Invalid upload." }, { status: 400 });
  }

  const file = formData.get("file");
  const kind = formData.get("kind");
  const visibility = formData.get("visibility") === "private" ? ("private" as Visibility) : ("public" as Visibility);
  if (!(file instanceof File) || (kind !== "image" && kind !== "pdf")) {
    return NextResponse.json({ message: "Choose a file to upload." }, { status: 400 });
  }

  try {
    const result = await saveUpload(file, kind as UploadKind, visibility);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof UploadError) return NextResponse.json({ message: error.message }, { status: 400 });
    console.error("Upload failed:", error);
    return NextResponse.json({ message: "The file could not be stored." }, { status: 500 });
  }
}
