"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { sections, site } from "@/data/social";

/**
 * Barra de navegação: wordmark, links âncora e uma ação. Sem "chrome"
 * desnecessário. No mobile os links viram um painel simples.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[var(--ground)]/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
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

      {/* Painel mobile — inerte quando fechado */}
      {open && (
        <nav
          id="nav-mobile"
          aria-label="Principal (móvel)"
          className="border-t border-[var(--border)] bg-[var(--ground)] md:hidden"
        >
          <ul className="mx-auto w-full max-w-6xl px-6 py-2">
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
        </nav>
      )}
    </header>
  );
}
