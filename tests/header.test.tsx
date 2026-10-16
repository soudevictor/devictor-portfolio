import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/layout/Header";
import { sections, site } from "@/data/social";

describe("Header", () => {
  it("renderiza o wordmark e um link por seção", () => {
    render(<Header />);

    expect(
      screen.getByRole("link", { name: site.shortName }),
    ).toHaveAttribute("href", "#inicio");

    const nav = screen.getByRole("navigation", { name: "Principal" });
    for (const s of sections) {
      expect(within(nav).getByRole("link", { name: s.label })).toHaveAttribute(
        "href",
        `#${s.id}`,
      );
    }
  });

  it("abre e fecha o painel mobile pelo botão, com aria-expanded correto", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    // Painel fechado: não existe no DOM (não fica escondido).
    expect(screen.queryByRole("navigation", { name: /móvel/i })).toBeNull();

    await user.click(toggle);

    const panel = screen.getByRole("navigation", { name: /móvel/i });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Fechar menu");
    expect(
      within(panel).getByRole("link", { name: sections[0]!.label }),
    ).toBeInTheDocument();
  });

  it("fecha o painel ao escolher uma âncora", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const panel = screen.getByRole("navigation", { name: /móvel/i });

    await user.click(within(panel).getByRole("link", { name: sections[1]!.label }));

    expect(screen.queryByRole("navigation", { name: /móvel/i })).toBeNull();
    expect(
      screen.getByRole("button", { name: "Abrir menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("acessa o painel pelo teclado", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    toggle.focus();
    expect(toggle).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(
      screen.getByRole("navigation", { name: /móvel/i }),
    ).toBeInTheDocument();

    // E fecha de volta com o mesmo teclado.
    await user.keyboard("{Enter}");
    expect(
      screen.queryByRole("navigation", { name: /móvel/i }),
    ).toBeNull();
  });
});
