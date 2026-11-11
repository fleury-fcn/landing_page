import type { Locale } from "./config";
import { ar } from "./dictionaries/ar";
import { en } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { fr, en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Interpolation minimaliste : format("Bonjour {name}", { name: "Amina" }). */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = vars[key];
    return value === undefined ? match : String(value);
  });
}
