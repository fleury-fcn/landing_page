import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CountUp } from "./CountUp";

describe("CountUp", () => {
  it("expose toujours la valeur finale aux lecteurs d'écran", () => {
    render(<CountUp value={42} format={(n) => `${n} produits`} />);
    const finals = screen.getAllByText("42 produits");
    expect(finals.some((el) => el.classList.contains("sr-only"))).toBe(true);
  });
});
