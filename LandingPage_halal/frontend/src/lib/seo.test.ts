import { describe, expect, it } from "vitest";
import { fr } from "@/i18n/dictionaries/fr";
import { buildJsonLd, buildMetadata, jsonLdScript } from "./seo";

describe("SEO", () => {
  it("déclare canonical et hreflang pour chaque langue + x-default", () => {
    const meta = buildMetadata("fr", fr);
    const langs = meta.alternates?.languages as Record<string, string>;
    expect(Object.keys(langs).sort()).toEqual(["ar", "en", "fr", "x-default"]);
    expect(String(meta.alternates?.canonical)).toMatch(/\/fr\/$/);
  });

  it("expose la FAQ en données structurées", () => {
    const graph = buildJsonLd("fr", fr)["@graph"] as { "@type": string; mainEntity?: unknown[] }[];
    const faq = graph.find((n) => n["@type"] === "FAQPage");
    expect(faq?.mainEntity).toHaveLength(fr.faq.items.length);
  });

  it("échappe les chevrons dans le JSON-LD", () => {
    expect(jsonLdScript({ a: "</script>" })).not.toContain("</script>");
  });
});
