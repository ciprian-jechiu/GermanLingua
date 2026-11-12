import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import ro, { type Dict } from "./dictionaries/ro";
import ru from "./dictionaries/ru";

const dictionaries: Record<Locale, Dict> = { ro, ru };

/** Validează limba din URL și întoarce textele ei. */
export function getDictionary(lang: string): { lang: Locale; dict: Dict } {
  if (!isLocale(lang)) notFound();
  return { lang, dict: dictionaries[lang] };
}
