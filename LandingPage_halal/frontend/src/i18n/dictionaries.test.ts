import { describe, expect, it } from "vitest";
import { locales } from "./config";
import { format, getDictionary } from "./get-dictionary";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, shape(v)]),
    );
  }
  return typeof value;
}

describe("dictionnaires", () => {
  it("ont exactement la même structure dans toutes les langues", () => {
    const reference = shape(getDictionary("fr"));
    for (const locale of locales) expect(shape(getDictionary(locale))).toEqual(reference);
  });

  it("contiennent la mise en garde « pas une fatwa »", () => {
    expect(getDictionary("fr").verdicts.disclaimerTitle).toMatch(/fatwa/i);
  });

  it("interpole les variables", () => {
    expect(format("{n} résultat(s) pour « {q} »", { n: 3, q: "miel" })).toBe("3 résultat(s) pour « miel »");
    expect(format("{inconnu}", {})).toBe("{inconnu}");
  });
});
