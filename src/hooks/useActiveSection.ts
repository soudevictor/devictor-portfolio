"use client";

import { useEffect, useState } from "react";

/**
 * Marca a seção que está sob a linha de leitura. O probe fica a ~35% da
 * viewport para a seção atual não depender do topo exato do documento.
 * Sem JS — ou em uma rota sem essas seções, como o 404 — não há destaque.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => {
        const element = document.getElementById(id);
        return element ? { id, element } : null;
      })
      .filter((entry): entry is { id: string; element: HTMLElement } => Boolean(entry));

    if (!elements.length) {
      setActiveId(null);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.35;
      const candidates = elements
        .map((entry) => ({
          id: entry.id,
          top: entry.element.getBoundingClientRect().top,
        }))
        .filter((entry) => entry.top <= probe)
        .sort((a, b) => b.top - a.top);

      // A ordem visual não é a ordem do menu (Projetos fica depois de Contato),
      // então o destaque segue a maior posição que já passou pelo probe.
      const current = candidates[0]?.id ?? elements[0]?.id ?? null;

      setActiveId((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return activeId;
}
