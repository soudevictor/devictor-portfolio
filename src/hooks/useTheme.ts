"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** Tema efetivamente aplicado no momento. Começa alinhado ao script anti-flash. */
function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Controla o tema claro/escuro. A classe `.dark` vai em `document.documentElement`,
 * é persistida no localStorage e respeita `prefers-color-scheme` quando nunca
 * houve escolha manual.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [hydrated, setHydrated] = useState(false);

  // Sincroniza com o que o script anti-flash já aplicou, após a hidratação.
  useEffect(() => {
    setThemeState(currentTheme());
    setHydrated(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.classList.toggle("dark", next === "dark");
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* armazenamento indisponível — o tema segue valendo nesta sessão */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme, hydrated };
}
