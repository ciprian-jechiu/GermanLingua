"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { captureSource, track } from "@/lib/track";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // ex. G-XXXXXXX (se adaugă când avem acces)
const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID; // ex. AW-XXXXXXX

/** Reține sursa vizitei și numără clicurile pe telefon, WhatsApp, Telegram, email și rețele. */
export default function Tracking() {
  const pathname = usePathname();

  useEffect(() => {
    captureSource();
  }, [pathname]);

  useEffect(() => {
    // Google Analytics / Google Ads — doar dacă au fost configurate
    const ids = [GA_ID, ADS_ID].filter(Boolean) as string[];
    if (ids.length && !window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
      window.gtag("js", new Date());
      ids.forEach((id) => window.gtag!("config", id));
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ids[0]}`;
      document.head.appendChild(s);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("phone_click");
      else if (href.includes("wa.me")) track("whatsapp_click");
      else if (href.includes("t.me")) track("telegram_click");
      else if (href.startsWith("mailto:")) track("email_click");
      else if (/facebook\.com|instagram\.com/.test(href)) track("social_click", { network: href.includes("instagram") ? "instagram" : "facebook" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
