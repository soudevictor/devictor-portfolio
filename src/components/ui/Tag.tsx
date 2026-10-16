interface TagProps {
  children: string;
  /** Tom de destaque para tecnologias centrais. */
  highlight?: boolean;
}

/**
 * Etiqueta curta para tecnologias/rótulos. Preenchimento por tom de superfície
 * (sem linha, sem sombra) — a separação vem do passo de cor, não de borda.
 */
export function Tag({ children, highlight = false }: TagProps) {
  return (
    <li
      className={`rounded px-2.5 py-1 text-sm ${
        highlight
          ? "bg-[var(--accent)]/12 text-[var(--accent)]"
          : "bg-[var(--surface-2)] text-[var(--ink-soft)]"
      }`}
    >
      {children}
    </li>
  );
}
