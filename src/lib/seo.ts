import type { Metadata } from "next";
import { courses } from "@/data/courses";
import { site } from "@/data/site";
import { locales, type Locale } from "@/i18n/config";

export const SITE_URL = "https://germanlingua.md";

/** Adresa completă a unei pagini, cu „/” la final (așa e servit site-ul). */
export function pageUrl(lang: Locale, path = "") {
  return `${SITE_URL}/${lang}${path}/`;
}

/**
 * Legăturile corecte pentru Google: pagina originală (canonical) și varianta ei
 * în cealaltă limbă (hreflang), pagină cu pagină — nu spre prima pagină.
 */
export function alternates(lang: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: pageUrl(lang, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, pageUrl(l, path)])),
      "x-default": pageUrl("ro", path),
    },
  };
}

/** Toate paginile site-ului (fără limbă în față), pentru harta site-ului. */
export const allPaths = ["", "/courses", "/about", "/contact", "/enroll", ...courses.map((c) => `/courses/${c.slug}`)];

/** Fișa școlii pentru Google (nume, adresă, telefon, program, rețele). */
export function schoolJsonLd(lang: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#school`,
    name: site.name,
    description,
    url: pageUrl(lang),
    logo: `${SITE_URL}/wp-content/uploads/2022/07/GermanLingua_logo.png`,
    image: `${SITE_URL}/images/hero-home.webp`,
    telephone: "+37368390114",
    email: site.email,
    priceRange: "350–4500 MDL",
    address: {
      "@type": "PostalAddress",
      streetAddress: lang === "ru" ? "ул. Сергея Лазо, 40, 5 этаж, офис 8" : "str. Serghei Lazo 40, et. 5, bir. 8",
      addressLocality: lang === "ru" ? "Кишинёв" : "Chișinău",
      addressCountry: "MD",
    },
    hasMap: "https://www.google.com/maps/search/?api=1&query=GermanLingua%2C%20str.%20Serghei%20Lazo%2040%2C%20Chi%C8%99in%C4%83u",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:30",
      },
    ],
    areaServed: "Moldova",
    knowsLanguage: ["de", "ro", "ru"],
    sameAs: [site.facebook, site.instagram],
  };
}
