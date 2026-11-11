export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export type Direction = "ltr" | "rtl";

export const localeMeta: Record<Locale, { label: string; dir: Direction; ogLocale: string }> = {
  fr: { label: "Français", dir: "ltr", ogLocale: "fr_FR" },
  en: { label: "English", dir: "ltr", ogLocale: "en_US" },
  ar: { label: "العربية", dir: "rtl", ogLocale: "ar_AR" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
