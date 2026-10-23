"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { useActiveSection } from "@/hooks/useActiveSection";
import { sections, site } from "@/data/social";

const sectionIds = sections.map((section) => section.id);

/**
 * Barra de navegação: logo, links âncora e uma ação. Sem "chrome"
 * desnecessário, sem vidro/flutuante — uma barra simples e sólida.
 * No mobile os links viram um painel simples, com fallback nativo sem JS.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 bg-[var(--surface-2)]"
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* A logo é branca porque o site é dark-only. O nome acessível vive
              no `aria-label` do link, não na imagem (que fica decorativa). */}
          <Link
            href="/"
            aria-label={site.shortName}
            className="inline-flex items-center"
          >
            <Image
              src="/images/logos/Devictor_LogoBranca.svg"
              alt=""
              width={937}
              height={356}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* Nav em telas médias+ */}
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {sections.map((s) => {
                const isActive = activeId === s.id;

                return (
                  <li key={s.id}>
                    <a
                      href={`/#${s.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative inline-block text-sm transition-colors ${
                        isActive
                          ? "text-[var(--ink)]"
                          : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {s.label}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[var(--accent)] transition-transform duration-150 ease-out ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Botão de menu no mobile: só existe quando há JS. */}
          <div className="js:block hidden md:hidden!">
            <button
              ref={toggleRef}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded text-[var(--ink)]"
              aria-expanded={open}
              aria-controls="nav-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Painel mobile: fica montado para entrar e sair com a mesma transição.
          Fechado, está invisível, `inert` e fora da árvore de acessibilidade. */}
      <nav
        id="nav-mobile"
        aria-label="Principal (móvel)"
        aria-hidden={!open}
        inert={!open || undefined}
        className={`absolute inset-x-0 top-full z-10 bg-[var(--ground)] transition-[opacity,transform,visibility] duration-150 ease-out md:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <Container>
          <ul className="py-2">
            {sections.map((s) => {
              const isActive = activeId === s.id;

              return (
                <li key={s.id}>
                  <a
                    href={`/#${s.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block py-3 transition-colors ${
                      isActive ? "text-[var(--accent)]" : "text-[var(--ink)]"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>

      {/* Fallback sem JS: um details nativo, fechado, no lugar do botão. */}
      <noscript>
        <details className="border-t border-[var(--border)] md:hidden">
          <summary className="cursor-pointer list-none py-2 text-center text-sm text-[var(--ink)] [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav
            aria-label="Principal (sem JavaScript)"
            className="absolute inset-x-0 top-full bg-[var(--ground)]"
          >
            <Container>
              <ul className="py-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`/#${s.id}`} className="block py-3 text-[var(--ink)]">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </nav>
        </details>
      </noscript>
    </header>
  );
}
