import { NextResponse } from "next/server";

/**
 * Primește cererile din formularele „Vreau la curs” și „Trimite-ne un mesaj”.
 * Dacă LEAD_WEBHOOK_URL este setat (de ex. un Google Apps Script legat de un
 * Google Sheet, ca la Casinia), cererea este trimisă acolo. Altfel apare doar
 * în logurile serverului.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");
  const lead = {
    name: text(body.name, 80),
    phone: text(body.phone, 24),
    comment: text(body.comment, 1000),
    lang: text(body.lang, 2),
    source: text(body.source, 40),
    course: text(body.course, 40),
    createdAt: new Date().toISOString(),
  };

  if (lead.name.length < 2 || lead.phone.replace(/\D/g, "").length < 6) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.log("[lead]", lead);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, secret: process.env.LEAD_WEBHOOK_SECRET ?? "" }),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lead] webhook failed", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
