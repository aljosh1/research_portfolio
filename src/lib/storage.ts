import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

export type UploadKind = "image" | "pdf";
export type Visibility = "public" | "private";

const LIMITS: Record<UploadKind, number> = { image: 5 * 1024 * 1024, pdf: 25 * 1024 * 1024 };
const UPLOAD_ROOT = path.join(process.cwd(), "uploads");

export const PRIVATE_PREFIX = "local-private:";

export function detectType(bytes: Uint8Array): { ext: string; mime: string; kind: UploadKind } | null {
  const startsWith = (sig: number[], offset = 0) => sig.every((b, i) => bytes[offset + i] === b);
  if (startsWith([0x25, 0x50, 0x44, 0x46])) return { ext: "pdf", mime: "application/pdf", kind: "pdf" };
  if (startsWith([0xff, 0xd8, 0xff])) return { ext: "jpg", mime: "image/jpeg", kind: "image" };
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return { ext: "png", mime: "image/png", kind: "image" };
  if (startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8)) {
    return { ext: "webp", mime: "image/webp", kind: "image" };
  }
  return null;
}

export const MIME_BY_EXT: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export class UploadError extends Error {}

/** Validates by file signature (not the client-supplied type), then stores under a random name. */
export async function saveUpload(file: File, kind: UploadKind, visibility: Visibility) {
  if (file.size === 0) throw new UploadError("The file is empty.");
  if (file.size > LIMITS[kind]) throw new UploadError(`File is too large (max ${LIMITS[kind] / 1024 / 1024} MB).`);

  const bytes = new Uint8Array(await file.arrayBuffer());
  const detected = detectType(bytes);
  if (!detected || detected.kind !== kind) {
    throw new UploadError(kind === "pdf" ? "Please upload a PDF file." : "Please upload a JPG, PNG or WebP image.");
  }

  const name = `${randomBytes(12).toString("hex")}.${detected.ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`${visibility}/${name}`, Buffer.from(bytes), {
      access: "public",
      contentType: detected.mime,
      addRandomSuffix: true,
    });
    return { url: blob.url, name: file.name };
  }

  const dir = path.join(UPLOAD_ROOT, visibility);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
  return { url: visibility === "public" ? `/files/${name}` : `${PRIVATE_PREFIX}${name}`, name: file.name };
}

const SAFE_NAME = /^[a-f0-9]{24}\.(pdf|jpg|png|webp)$/;

export async function readLocalFile(visibility: Visibility, name: string) {
  if (!SAFE_NAME.test(name)) return null;
  try {
    const data = await readFile(path.join(UPLOAD_ROOT, visibility, name));
    const ext = name.split(".").pop() as string;
    return { data, mime: MIME_BY_EXT[ext] };
  } catch {
    return null;
  }
}
