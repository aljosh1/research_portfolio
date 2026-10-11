"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Send } from "lucide-react";

type Status = { kind: "success" | "error"; message: string } | null;

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          kind: "error",
          message: result.message ?? "Your message could not be sent.",
        });
        return;
      }

      form.reset();
      setStatus({
        kind: "success",
        message: "Thanks for reaching out. I’ll be in touch soon.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Something went wrong. Please try again or email me directly.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Your name
          <input
            autoComplete="name"
            name="name"
            placeholder="Jane Smith"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            autoComplete="email"
            name="email"
            placeholder="jane@company.com"
            type="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        What would you like to talk about?
        <textarea
          name="message"
          placeholder="A little about your project, role, or idea..."
          rows={5}
          required
          minLength={10}
          maxLength={5000}
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-submit-row">
        <button
          className="button button-dark"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Send a message"}
          {status?.kind === "success" ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Send size={15} aria-hidden="true" />
          )}
        </button>
        <p className="form-privacy">
          No spam, just a reply. Your details stay private.
        </p>
      </div>
      <p
        className={`form-status${status ? ` is-${status.kind}` : ""}`}
        role="status"
        aria-live="polite"
      >
        {status?.message ?? ""}
      </p>
      <a className="form-fallback" href={`mailto:${email}`}>
        Prefer email? Write to {email}{" "}
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </form>
  );
}
