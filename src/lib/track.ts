/**
 * Măsurarea cererilor: de unde a venit vizitatorul (reclamă, Google, Facebook…)
 * și ce a făcut (formular, apel, WhatsApp, Telegram).
 * Fără coduri de cont: evenimentele se scriu pe serverul școlii (/api/event.php)
 * și, dacă Google Analytics / Google Ads e instalat, și acolo (dataLayer).
 */

type Src = { s: string; m: string; c: string; t: string; gclid: string; ref: string; land: string; at: number };
const KEY = "gl_src";
const DAYS_90 = 90 * 24 * 3600 * 1000;

function read(): Src | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null") as Src | null;
    return v && Date.now() - v.at < DAYS_90 ? v : null;
  } catch {
    return null;
  }
}

/** Rulează la fiecare încărcare de pagină: reține sursa vizitei (ultima sursă „reală” câștigă). */
export function captureSource() {
  try {
    const q = new URLSearchParams(location.search);
    const ref = document.referrer && !document.referrer.includes(location.host) ? document.referrer : "";
    const gclid = q.get("gclid") || q.get("gbraid") || q.get("wbraid") || "";
    const hasTag = q.get("utm_source") || gclid || q.get("fbclid");
    if (!hasTag && !ref && read()) return; // navigare internă sau revenire directă: păstrăm sursa veche
    const v: Src = {
      s: q.get("utm_source") || (gclid ? "google" : q.get("fbclid") ? "facebook" : ""),
      m: q.get("utm_medium") || (gclid ? "cpc" : ""),
      c: q.get("utm_campaign") || "",
      t: q.get("utm_content") || q.get("utm_term") || "",
      gclid,
      ref,
      land: location.pathname,
      at: Date.now(),
    };
    localStorage.setItem(KEY, JSON.stringify(v));
  } catch {
    /* fără stocare: nu e grav */
  }
}

/** Sursa vizitei în cuvinte simple, pentru mail și tabel. */
export function sourceLabel(): string {
  const v = read();
  if (!v) return "Direct (a scris adresa sau din favorite)";
  const host = (() => {
    try {
      return v.ref ? new URL(v.ref).hostname.replace(/^www\./, "") : "";
    } catch {
      return "";
    }
  })();
  let base: string;
  if (v.gclid || (v.s === "google" && /cpc|ppc|paid/.test(v.m))) base = "Reclamă Google";
  else if (v.s) base = `Reclamă/link: ${v.s}${v.m ? " / " + v.m : ""}`;
  else if (/google\./.test(host)) base = "Căutare Google";
  else if (/facebook|instagram/.test(host)) base = host.includes("instagram") ? "Instagram" : "Facebook";
  else if (/yandex|bing/.test(host)) base = `Căutare ${host.split(".")[0]}`;
  else if (host) base = `Link de pe ${host}`;
  else base = "Direct (a scris adresa sau din favorite)";
  const extra = [v.c && `campanie: ${v.c}`, v.t && `anunț: ${v.t}`].filter(Boolean).join(", ");
  return extra ? `${base} (${extra})` : base;
}

export function sourceData() {
  const v = read();
  return { label: sourceLabel(), gclid: v?.gclid || "", landing: v?.land || "" };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Înregistrează o acțiune (formular, apel, WhatsApp…). */
export function track(event: string, extra: Record<string, string> = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...extra });
    window.gtag?.("event", event, extra);
    if (event === "form_submit") return; // formularul e numărat direct pe server (lead.php)
    const body = JSON.stringify({ event, page: location.pathname, src: sourceLabel(), ...extra });
    if (!navigator.sendBeacon?.("/api/event.php", new Blob([body], { type: "text/plain" }))) {
      fetch("/api/event.php", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* măsurarea nu are voie să strice site-ul */
  }
}
