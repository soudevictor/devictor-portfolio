import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

interface SectionProps {
  /** Id da âncora (ex.: "sobre"). */
  id: string;
  /** Título visível; também vira o accessible name da landmark. */
  title: string;
  children: ReactNode;
  className?: string;
  /** Esconde o título visualmente mas mantém para leitores de tela. */
  titleHidden?: boolean;
}

/**
 * Seção com landmark `<section>`, âncora com `id` e um heading que dá o
 * accessible name. O vão entre seções é claramente maior que o vão interno.
 */
export function Section({
  id,
  title,
  children,
  className = "",
  titleHidden = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-24 py-20 md:py-32 ${className}`}
    >
      <Container>
        <h2
          id={`${id}-title`}
          className={
            titleHidden
              ? "sr-only"
              : "mb-10 text-3xl font-semibold tracking-tight text-[var(--ink)] md:mb-14 md:text-4xl"
          }
        >
          {title}
        </h2>
        {children}
      </Container>
    </section>
  );
}
