import { describe, expect, it } from "vitest";
import { isVerdict, overallVerdict } from "./verdict";

describe("overallVerdict", () => {
  it("retient le statut le plus prudent", () => {
    expect(overallVerdict(["halal", "doubtful", "halal"])).toBe("doubtful");
    expect(overallVerdict(["halal", "haram", "doubtful"])).toBe("haram");
    expect(overallVerdict(["halal", "unknown"])).toBe("unknown");
    expect(overallVerdict(["halal"])).toBe("halal");
  });
  it("renvoie inconnu sans ingrédient", () => {
    expect(overallVerdict([])).toBe("unknown");
  });
});

describe("isVerdict", () => {
  it("valide les valeurs de l'API", () => {
    expect(isVerdict("haram")).toBe(true);
    expect(isVerdict("mushbooh")).toBe(false);
    expect(isVerdict(3)).toBe(false);
  });
});
