import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fr } from "@/i18n/dictionaries/fr";
import { LiveStats } from "./LiveStats";

const props = { copy: fr.stats, labels: fr.verdicts.labels, locale: "fr" as const };

describe("LiveStats", () => {
  afterEach(() => vi.restoreAllMocks());

  it("affiche les chiffres en direct de l'API", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) =>
      String(input).includes("/stats/")
        ? new Response(
            JSON.stringify({
              products: { food: 1000, beauty: 234, total: 1234 },
              ingredients: 560,
              contributors: 78,
              updated_at: "2026-11-10T10:00:00Z",
            }),
          )
        : new Response("[]"),
    );
    render(<LiveStats {...props} />);
    expect(await screen.findByText(/Données en direct/)).toBeInTheDocument();
    expect(screen.getByText((text) => text.replace(/\s/g, "") === "1234")).toBeInTheDocument();
  });

  it("bascule sur le repli statique si l'API échoue", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));
    render(<LiveStats {...props} />);
    expect(screen.getByRole("status")).toHaveTextContent(fr.stats.loading);
    expect(await screen.findByText(fr.stats.fallback)).toBeInTheDocument();
  });
});
