import { describe, expect, it } from "vitest";
import { isLocale, localeMeta, locales } from "./config";

describe("i18n config", () => {
  it("reconnaît les locales supportées", () => {
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("de")).toBe(false);
  });
  it("déclare l'arabe en RTL", () => {
    expect(localeMeta.ar.dir).toBe("rtl");
    expect(locales.every((l) => localeMeta[l].dir === (l === "ar" ? "rtl" : "ltr"))).toBe(true);
  });
});
