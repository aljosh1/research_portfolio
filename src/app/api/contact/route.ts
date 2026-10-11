import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Please submit a valid message." },
      { status: 400 },
    );
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    return NextResponse.json(
      { message: "Please submit a valid message." },
      { status: 400 },
    );
  }
  const body = payload as Record<string, unknown>;

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json(
      { message: "Please submit a valid message." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !name ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
    email.length > 254 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      {
        message: "Please check your name, email, and message, then try again.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO;
  const sender = process.env.CONTACT_FROM;

  if (!apiKey || !recipient || !sender) {
    return NextResponse.json(
      {
        message:
          "The contact form is not configured yet. Please email me directly.",
      },
      { status: 503 },
    );
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: "New portfolio message",
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
  } catch (error) {
    console.error("Contact email provider request failed:", error);
    return NextResponse.json(
      {
        message: "We couldn’t deliver your message. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  if (!response.ok) {
    console.error("Contact email provider returned an error:", response.status);
    return NextResponse.json(
      {
        message: "We couldn’t deliver your message. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Message sent successfully." });
}
