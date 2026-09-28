"use client";

import { contact, site } from "@/lib/content";
import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const fieldClassName =
  "border border-surface-dark-fg/25 bg-transparent px-3 py-2.5 font-mono text-[0.75rem] uppercase tracking-[0.04em] text-surface-dark-fg outline-none focus:border-surface-dark-fg disabled:opacity-60";

export function ContactForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          topic: data.get("topic"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      const payload = (await res.json()) as { error?: string; ok?: boolean };

      if (!res.ok) {
        setStatus("error");
        setError(payload.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Try emailing directly.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-5 ${className}`.trim()}
      noValidate
    >
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="meta text-surface-dark-fg/55">Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={status === "sending"}
            className={`${fieldClassName} placeholder:text-surface-dark-fg/35`}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="meta text-surface-dark-fg/55">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={status === "sending"}
            className={`${fieldClassName} placeholder:text-surface-dark-fg/35`}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="meta text-surface-dark-fg/55">Topic</span>
        <select
          name="topic"
          required
          defaultValue=""
          disabled={status === "sending"}
          className={`${fieldClassName} cursor-pointer`}
        >
          <option value="" disabled>
            Select a topic
          </option>
          {contact.topics.map((topic) => (
            <option key={topic} value={topic} className="bg-surface-dark text-surface-dark-fg">
              {topic}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="meta text-surface-dark-fg/55">Message</span>
        <textarea
          name="message"
          required
          rows={8}
          disabled={status === "sending"}
          placeholder="Project, timeline, stack…"
          className={`${fieldClassName} min-h-[10rem] resize-y normal-case leading-relaxed placeholder:text-surface-dark-fg/35 sm:min-h-[12rem]`}
        />
      </label>

      <div className="flex flex-col items-end gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "sending" || status === "success"}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Send Message"}
          <span aria-hidden>↗</span>
        </button>
        {status === "success" ? (
          <p className="meta text-surface-dark-fg/70">Message sent. I&apos;ll reply soon.</p>
        ) : null}
        {status === "error" && error ? (
          <p className="meta text-accent">
            {error}{" "}
            <a href={`mailto:${site.email}`} className="underline hover:no-underline">
              Email me
            </a>
          </p>
        ) : null}
      </div>
    </form>
  );
}
