import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

/**
 * 404 estático do export. Mesmo solo e tipografia do resto do site, sem
 * repetir o Header/Footer — eles já vêm do layout raiz.
 */
export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="flex min-h-dvh items-center py-24"
    >
      <Container>
        <p className="text-sm font-medium tracking-[0.2em] text-[var(--accent)]">404</p>
        <h1
          id="not-found-title"
          className="mt-4 max-w-[18ch] text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl"
        >
          Página não encontrada.
        </h1>
        <p className="mt-5 max-w-[46ch] leading-relaxed text-[var(--ink-soft)]">
          O endereço pode ter mudado ou nunca existiu. Volte ao início para continuar
          navegando.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded bg-[var(--accent-fill)] px-5 py-2.5 text-sm font-medium text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-fill-hover)]"
          >
            Voltar ao início
          </Link>
          <Link
            href="/#contato"
            className="rounded bg-[var(--surface-2)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--border)]"
          >
            Ir para o contato
          </Link>
        </div>
      </Container>
    </section>
  );
}
