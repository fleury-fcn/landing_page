import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VerdictBadge } from "./VerdictBadge";

describe("VerdictBadge", () => {
  it("affiche toujours un libellé texte en plus de la couleur", () => {
    render(<VerdictBadge verdict="doubtful" label="Douteux" />);
    const badge = screen.getByText("Douteux");
    expect(badge).toHaveAttribute("data-verdict", "doubtful");
    expect(badge.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
