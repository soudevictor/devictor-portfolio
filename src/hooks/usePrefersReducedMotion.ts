"use client";

import { useEffect, useState } from "react";

/**
 * Retorna true quando o usuário pediu menos movimento. Começa em `true`
 * para que, sem JS, o conteúdo apareça estático (fallback honesto).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
