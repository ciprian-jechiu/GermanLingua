import type { MetadataRoute } from "next";
import { allPaths, pageUrl } from "@/lib/seo";
import { locales } from "@/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths.flatMap((path) =>
    locales.map((lang) => ({
      url: pageUrl(lang, path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/courses/") ? 0.8 : 0.6,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, pageUrl(l, path)])) },
    })),
  );
}
