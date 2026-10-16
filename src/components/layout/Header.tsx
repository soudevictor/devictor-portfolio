"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { sections, site } from "@/data/social";

/**
 * Barra de navegação: wordmark, links âncora e uma ação. Sem "chrome"
 * desnecessário, sem vidro/flutuante — uma barra simples e sólida.
 * No mobile os links viram um painel simples.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[var(--surface-2)]">
      <Container>
        <div className="flex items-center justify-between py-4">
          <a
            href="#inicio"
            className="text-lg font-semibold tracking-tight text-[var(--ink)]"
          >
            {site.shortName}
          </a>

          {/* Nav em telas médias+ */}
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botão de menu no mobile */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded text-[var(--ink)] md:hidden"
            aria-expanded={open}
            aria-controls="nav-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* Painel mobile — só renderiza quando aberto */}
      {open && (
        <nav
          id="nav-mobile"
          aria-label="Principal (móvel)"
          className="bg-[var(--ground)] md:hidden"
        >
          <Container>
            <ul className="py-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[var(--ink)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
