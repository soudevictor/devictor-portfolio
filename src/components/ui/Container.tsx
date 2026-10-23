import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper de largura máxima centralizado, com as margens apertadas usadas em
 * todo o site. Um único grid, uma única par de margens — os textos compartilham
 * as mesmas arestas à esquerda.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}
