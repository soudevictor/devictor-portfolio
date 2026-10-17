"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";

/**
 * Alterna claro/escuro. É um botão de verdade: acessível por teclado,
 * com `aria-label` descritivo e rótulo mudo para leitores de tela.
 */
export function ThemeToggle() {
  const { theme, toggleTheme, hydrated } = useTheme();

  // Evita mismatch de hidratação: renderiza neutro até saber o tema real.
  const isDark = hydrated && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] transition-colors hover:bg-[var(--surface-2)]"
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
