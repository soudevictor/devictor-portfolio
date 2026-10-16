"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterProps {
  phrases: string[];
  /** aria-hidden pode vir como boolean ou string ("true"), como no JSX. */
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * Exibe o texto do hook useTypewriter. Com reduced-motion mostra a primeira
 * frase estática. O cursor é renderizado pelo chamador.
 */
export function Typewriter({ phrases, "aria-hidden": ariaHidden }: TypewriterProps) {
  const { text } = useTypewriter({ phrases });

  return <span aria-hidden={ariaHidden}>{text}</span>;
}
