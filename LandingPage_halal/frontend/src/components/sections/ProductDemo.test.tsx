import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { fr } from "@/i18n/dictionaries/fr";
import { ProductDemo } from "./ProductDemo";

describe("ProductDemo", () => {
  it("affiche le statut global le plus prudent (haram pour l'exemple aliment)", () => {
    render(<ProductDemo dict={fr} />);
    const panel = screen.getByRole("tabpanel");
    expect(panel.querySelector('[data-verdict="haram"]')).toHaveTextContent("Haram");
  });

  it("navigue entre les onglets au clavier", async () => {
    const user = userEvent.setup();
    render(<ProductDemo dict={fr} />);
    const food = screen.getByRole("tab", { name: "Aliment" });
    await user.click(food);
    await user.keyboard("{ArrowRight}");
    const beauty = screen.getByRole("tab", { name: "Cosmétique" });
    expect(beauty).toHaveAttribute("aria-selected", "true");
    expect(beauty).toHaveFocus();
    expect(screen.getByRole("heading", { name: fr.demo.beauty.name })).toBeVisible();
  });

  it("affiche la source et les divergences d'un ingrédient", () => {
    render(<ProductDemo dict={fr} />);
    expect(screen.getAllByText(/Al-Baqara/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/malikite/).length).toBeGreaterThan(0);
  });
});
