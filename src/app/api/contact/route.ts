import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendNotification } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/utils";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";

const invalid = (message = "Please check your details and try again.") =>
  NextResponse.json({ message }, { status: 400 });

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many messages from your network. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return invalid();
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return invalid(parsed.error.issues[0]?.message);
  const { name, email, topic, message } = parsed.data;

  await db.message.create({ data: { name, email, topic, message } });
  await sendNotification({
    subject: `[Academic website] ${topic} — ${name}`,
    text: `From: ${name} <${email}>\nTopic: ${topic}\n\n${message}`,
    replyTo: email,
  });

  // The enquiry is stored for the admin inbox even if email delivery is not configured.
  return NextResponse.json({ message: "Thank you — your message has been received." });
}
