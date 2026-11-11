import type { Metadata } from "next";
import { defaultLocale, localeMeta, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { communityLinks, projectLinks, site } from "./site";

export const localeUrl = (locale: Locale, path = ""): string => `${site.url}/${locale}/${path}`;

export function buildMetadata(locale: Locale, dict: Dictionary, path = ""): Metadata {
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, localeUrl(l, path)]));
  languages["x-default"] = localeUrl(defaultLocale, path);
  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: site.name,
    alternates: { canonical: localeUrl(locale, path), languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url: localeUrl(locale, path),
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

/** Données structurées schema.org : Organization, WebSite (+ recherche) et FAQPage. */
export function buildJsonLd(locale: Locale, dict: Dictionary): Record<string, unknown> {
  const orgId = `${site.url}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        sameAs: [communityLinks.github],
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: localeUrl(locale),
        inLanguage: locale,
        publisher: { "@id": orgId },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${projectLinks.search("food")}?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: dict.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

/** Sérialisation sûre dans une balise <script> (empêche la fermeture prématurée). */
export const jsonLdScript = (data: unknown): string => JSON.stringify(data).replace(/</g, "\\u003c");
