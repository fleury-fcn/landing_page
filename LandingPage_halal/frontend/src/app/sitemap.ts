import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localeUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, localeUrl(l)]));
  return locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "fr" ? 1 : 0.8,
    alternates: { languages },
  }));
}
