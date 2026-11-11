export const locales = ["de", "ro", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  ro: "Română",
  en: "English",
  ru: "Русский",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
