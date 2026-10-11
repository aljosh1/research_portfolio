import "server-only";

type Mail = { subject: string; text: string; replyTo?: string };

export const emailConfigured = () =>
  Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO && process.env.CONTACT_FROM);

/** Sends through Resend. Returns false (never throws) so a mail outage cannot lose a stored enquiry. */
export async function sendNotification({ subject, text, replyTo }: Mail) {
  if (!emailConfigured()) return false;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO],
        reply_to: replyTo,
        subject,
        text,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Email provider request failed:", error);
    return false;
  }
}
