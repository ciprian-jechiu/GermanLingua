"use client";

import { useState, type FormEvent } from "react";
import type { Dict } from "@/i18n/dictionaries/ro";
import { Icon } from "./Icon";

type Props = { form: Dict["form"]; lang: string; source: string; course?: string; dark?: boolean };

export default function LeadForm({ form, lang, source, course, dark }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = Object.fromEntries(new FormData(formEl)) as Record<string, string>;
    if (data.website) return; // capcană pentru boți
    setState("sending");
    try {
      const res = await fetch("/api/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, phone: data.phone, comment: data.comment, lang, source, course }),
      });
      if (!res.ok) throw new Error("bad status");
      formEl.reset();
      setState("done");
    } catch {
      setState("error");
    }
  }

  const field = `w-full rounded-2xl border px-5 py-4 text-base outline-none transition-colors focus:border-brand ${
    dark ? "border-white/15 bg-white/5 text-white placeholder:text-white/45" : "border-line bg-white text-ink placeholder:text-muted/80"
  }`;

  if (state === "done") {
    return (
      <div role="status" className={`flex items-start gap-4 rounded-3xl p-7 ${dark ? "bg-white/5 text-white" : "bg-mist text-ink"}`}>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white">
          <Icon name="check" size={22} />
        </span>
        <p className="pt-2 text-lg font-medium">{form.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">{form.name}</span>
          <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder={`${form.name} *`} className={field} />
        </label>
        <label className="block">
          <span className="sr-only">{form.phone}</span>
          <input name="phone" type="tel" required minLength={6} maxLength={24} autoComplete="tel" placeholder={`${form.phone} *`} className={field} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">{form.comment}</span>
        <textarea name="comment" rows={4} maxLength={1000} placeholder={form.comment} className={`${field} resize-none`} />
      </label>
      <button type="submit" disabled={state === "sending"} className="btn btn-brand w-full disabled:opacity-70 sm:w-auto">
        {state === "sending" ? form.sending : form.submit}
        <Icon name="arrow" size={18} />
      </button>
      {state === "error" && (
        <p role="alert" className={`text-sm font-medium ${dark ? "text-gold" : "text-brand"}`}>
          {form.error}
        </p>
      )}
    </form>
  );
}
