import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fr } from "@/i18n/dictionaries/fr";
import { HeroSearch } from "./HeroSearch";

const props = {
  copy: fr.search,
  cta: fr.hero.ctaSearch,
  addLabel: fr.contribute.add.cta,
  projectNames: { food: "Alimentation", beauty: "Cosmétiques" },
  labels: fr.verdicts.labels,
};

const page = (results: unknown[]) =>
  new Response(JSON.stringify({ count: results.length, next: null, previous: null, results }));

describe("HeroSearch", () => {
  afterEach(() => vi.restoreAllMocks());

  it("demande au moins 2 caractères sans appeler l'API", async () => {
    const spy = vi.spyOn(globalThis, "fetch");
    render(<HeroSearch {...props} />);
    await userEvent.type(screen.getByLabelText(fr.search.inputLabel), "a{Enter}");
    expect(screen.getByRole("status")).toHaveTextContent(fr.search.minChars);
    expect(spy).not.toHaveBeenCalled();
  });

  it("affiche les résultats avec leur verdict (texte + couleur)", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      page([{ barcode: "1", name: "Baume", brand: "X", project: "beauty", verdict: "halal", image_url: "" }]),
    );
    render(<HeroSearch {...props} />);
    await userEvent.click(screen.getByLabelText("Cosmétiques"));
    await userEvent.type(screen.getByLabelText(fr.search.inputLabel), "baume{Enter}");
    expect(await screen.findByText("Baume")).toBeInTheDocument();
    expect(screen.getByText("Halal")).toHaveAttribute("data-verdict", "halal");
    expect(screen.getByRole("status")).toHaveTextContent("1 résultat(s) pour « baume »");
  });

  it("affiche un message d'erreur si l'API est indisponible", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));
    render(<HeroSearch {...props} />);
    await userEvent.type(screen.getByLabelText(fr.search.inputLabel), "miel{Enter}");
    expect(await screen.findByText(fr.search.error)).toBeInTheDocument();
  });

  it("propose d'ajouter le produit quand rien n'est trouvé", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(page([]));
    render(<HeroSearch {...props} />);
    await userEvent.type(screen.getByLabelText(fr.search.inputLabel), "zzz{Enter}");
    expect(await screen.findByRole("link", { name: fr.contribute.add.cta })).toBeInTheDocument();
  });
});
