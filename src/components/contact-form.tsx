"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, contactTopics } from "@/lib/validation";
import type { z } from "zod";

type Values = z.input<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", topic: contactTopics[0], message: "", website: "" },
  });

  async function onSubmit(values: Values) {
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (res.ok) {
        reset();
        setStatus({ ok: true, text: data.message ?? "Thank you — your message has been sent." });
      } else {
        setStatus({ ok: false, text: data.message ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ ok: false, text: "Network error. Please try again." });
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit(onSubmit)} noValidate>
      {status && (
        <div className={`alert ${status.ok ? "alert-ok" : "alert-error"}`} role={status.ok ? "status" : "alert"}>
          {status.text}
        </div>
      )}
      <div className="form-row">
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" className="input" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
          {errors.name && <span className="field-error">{errors.name.message}</span>}
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" className="input" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-topic">Topic</label>
        <select id="c-topic" className="select" {...register("topic")}>
          {contactTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" className="textarea" rows={6} aria-invalid={!!errors.message} {...register("message")} />
        {errors.message && <span className="field-error">{errors.message.message}</span>}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="c-website">Leave this empty</label>
        <input id="c-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        <Send size={16} /> {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}