interface TagProps {
  children: string;
  /** Tom de destaque para tecnologias centrais / categoria. */
  highlight?: boolean;
  /** Fundo elevado — uma etapa acima do solo da seção (seções em `--surface-2`). */
  raised?: boolean;
}

/**
 * Etiqueta curta para tecnologias/rótulos. Preenchimento por tom de superfície
 * (sem linha, sem sombra) — a separação vem do passo de cor, não de borda.
 */
export function Tag({ children, highlight = false, raised = false }: TagProps) {
  const tone = highlight
    ? "bg-[var(--accent)]/12 font-medium text-[var(--accent)]"
    : raised
      ? "bg-[var(--surface)] text-[var(--ink-soft)]"
      : "bg-[var(--surface-2)] text-[var(--ink-soft)]";

  return <li className={`rounded px-2.5 py-1 text-sm ${tone}`}>{children}</li>;
}
