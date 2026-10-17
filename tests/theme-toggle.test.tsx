import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ThemeToggle } from "@/components/layout/ThemeToggle";

describe("ThemeToggle", () => {
  it("alterna o tema e persiste a escolha", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    const initialLabel = button.getAttribute("aria-label")!;

    await user.click(button);

    // A classe vai no <html>, como manda o script anti-flash.
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("theme")).toBe("dark");
    // O rótulo passa a descrever a ação inversa.
    expect(button.getAttribute("aria-label")).not.toBe(initialLabel);
    expect(button).toHaveAccessibleName("Ativar tema claro");
  });

  it("vai para o claro no segundo clique", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    await user.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await user.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("theme")).toBe("light");
  });

  it("o ícone é decorativo (aria-hidden) e o nome vem do rótulo", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    // Nenhum texto alternativo do SVG compete com o aria-label.
    expect(button).toHaveAccessibleName(/Ativar tema/);
    const svg = button.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
