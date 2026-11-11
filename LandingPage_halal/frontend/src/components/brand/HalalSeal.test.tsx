import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HalalSeal } from "./HalalSeal";
import { ProjectLogo } from "./ProjectLogo";

describe("HalalSeal", () => {
  it("est décoratif par défaut", () => {
    const { container } = render(<HalalSeal />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
  it("devient une image nommée avec un titre", () => {
    render(<HalalSeal variant="food" title="Sceau halalopenfoodfacts" />);
    expect(screen.getByRole("img", { name: "Sceau halalopenfoodfacts" })).toBeInTheDocument();
  });
  it("affiche « حلال » dans le sceau principal", () => {
    const { container } = render(<HalalSeal variant="halal" />);
    expect(container.textContent).toContain("حلال");
  });
});

describe("ProjectLogo", () => {
  it("compose le nom du projet", () => {
    const { container } = render(<ProjectLogo project="beauty" />);
    expect(container.textContent).toBe("halalopenbeautyfacts");
  });
});
