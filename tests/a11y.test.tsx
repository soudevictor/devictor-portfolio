import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";

/**
 * `color-contrast` fica desligado aqui de propósito: jsdom não faz layout nem
 * resolução de cor, então axe só reportaria falso negativo. O contraste real é
 * medido no browser pela inspeção (tasteskill), que olha os pixels.
 */
const AXE_OPTIONS: axe.RunOptions = {
  rules: { "color-contrast": { enabled: false } },
};

/** Roda axe no elemento e falha com uma mensagem legível por violação. */
async function expectNoViolations(element: HTMLElement) {
  const results = await axe.run(element, AXE_OPTIONS);
  const summary = results.violations.map(
    (v) =>
      `${v.id} (${v.impact}): ${v.help}\n` +
      v.nodes.map((n) => `  → ${n.target.join(" ")}`).join("\n"),
  );

  expect(summary, summary.join("\n\n")).toEqual([]);
}

describe("acessibilidade (axe)", () => {
  it("Header não tem violações", async () => {
    const { container } = render(<Header />);
    await expectNoViolations(container);
  });

  it("Hero não tem violações", async () => {
    const { container } = render(<Hero />);
    await expectNoViolations(container);
  });

  it("About não tem violações", async () => {
    const { container } = render(<About />);
    await expectNoViolations(container);
  });

  it("Stack não tem violações", async () => {
    const { container } = render(<Stack />);
    await expectNoViolations(container);
  });

  it("Projects não tem violações", async () => {
    const { container } = render(<Projects />);
    await expectNoViolations(container);
  });

  it("Contact não tem violações", async () => {
    const { container } = render(<Contact />);
    await expectNoViolations(container);
  });

  it("formulário de contato não tem violações com erros visíveis", async () => {
    const user = userEvent.setup();
    const { container } = render(<Contact />);

    // Dispara a validação paraaxe ver os estados de erro.
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    await expectNoViolations(container);
  });
});

describe("landmarks nomeadas (aria-labelledby)", () => {
  const cases = [
    { el: <Hero />, titleId: "inicio-title" },
    { el: <About />, titleId: "sobre-title" },
    { el: <Stack />, titleId: "stack-title" },
    { el: <Projects />, titleId: "projetos-title" },
    { el: <Contact />, titleId: "contato-title" },
  ];

  it.each(cases)("a seção aponta para $titleId", ({ el, titleId }) => {
    const { container } = render(el);
    const section = container.querySelector("section");

    expect(section).toHaveAttribute("aria-labelledby", titleId);
    expect(container.querySelector(`#${titleId}`)).toBeInTheDocument();
  });
});
