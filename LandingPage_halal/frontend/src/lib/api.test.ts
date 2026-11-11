import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError, api, isApiStats, isProductSummary } from "./api";

const product = { barcode: "1", name: "A", brand: "B", project: "food", verdict: "halal", image_url: "" };

describe("gardes de type", () => {
  it("valide un produit et rejette un verdict inconnu", () => {
    expect(isProductSummary(product)).toBe(true);
    expect(isProductSummary({ ...product, verdict: "maybe" })).toBe(false);
    expect(isProductSummary({ ...product, project: "cars" })).toBe(false);
  });
  it("valide les stats", () => {
    const stats = { products: { food: 1, beauty: 2, total: 3 }, ingredients: 4, contributors: 5, updated_at: "x" };
    expect(isApiStats(stats)).toBe(true);
    expect(isApiStats({ ...stats, ingredients: -1 })).toBe(false);
  });
});

describe("client API", () => {
  afterEach(() => vi.restoreAllMocks());

  it("lève une ApiError http sur un statut d'erreur", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 500 }));
    await expect(api.stats()).rejects.toMatchObject({ kind: "http", status: 500 });
  });

  it("lève une ApiError invalid si le JSON ne correspond pas au contrat", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ nope: true })));
    await expect(api.stats()).rejects.toBeInstanceOf(ApiError);
  });

  it("lève une ApiError network si le serveur est injoignable", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(api.popular()).rejects.toMatchObject({ kind: "network" });
  });

  it("encode les paramètres de recherche", async () => {
    const spy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ count: 1, next: null, previous: null, results: [product] })));
    const res = await api.search("pâte & co", "beauty");
    expect(res.count).toBe(1);
    expect(String(spy.mock.calls[0]?.[0])).toContain("q=p%C3%A2te+%26+co&project=beauty");
  });
});
