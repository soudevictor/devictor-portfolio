"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Entrada por seção: sobe 16px e aparece quando o bloco entra na viewport,
 * uma vez só. Só transform/opacity (composite barato).
 *
 * O estado inicial vem do CSS: a classe `js` (posta no <head> antes da
 * pintura) esconde `[data-reveal]:not(.is-in)`. O React só adiciona a classe
 * `is-in` quando o observer dispara — assim não há flash de
 * "visível → oculto → visível" e, sem script, o conteúdo já aparece (nada fica
 * preso em opacity-0).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Atraso em ms para o stagger entre partes de uma seção. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`${className} ${shown ? "is-in" : ""}`}
    >
      {children}
    </div>
  );
}
