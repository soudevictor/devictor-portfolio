"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface UseTypewriterOptions {
  /** Frases a alternar. */
  phrases: string[];
  /** Velocidade de digitação (ms por caractere). */
  typeSpeed?: number;
  /** Velocidade de apagamento (ms por caractere). */
  deleteSpeed?: number;
  /** Pausa antes de começar a apagar (ms). */
  holdTime?: number;
}

/**
 * Typewriter próprio (~30 linhas, sem dependência). Digita cada frase, segura,
 * apaga e passa para a próxima. Com `prefers-reduced-motion` entrega a primeira
 * frase estática — conteúdo sem travel.
 */
export function useTypewriter({
  phrases,
  typeSpeed = 65,
  deleteSpeed = 32,
  holdTime = 1800,
}: UseTypewriterOptions) {
  const reduced = usePrefersReducedMotion();
  // A primeira frase nasce no HTML: sem JS a linha não fica em branco e,
  // com JS, o ciclo começa da frase completa em vez de um flash vazio.
  const [text, setText] = useState(phrases[0] ?? "");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Fallback estático: primeira frase, sem animação.
  useEffect(() => {
    if (reduced) {
      setText(phrases[0] ?? "");
    }
  }, [reduced, phrases]);

  useEffect(() => {
    if (reduced) return;

    const current = phrases[index] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      // Frase completa: segura antes de apagar.
      timer = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && text === "") {
      // Frase apagada: avança para a próxima.
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timer = setTimeout(
        () => {
          const next = deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1);
          setText(next);
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, reduced, phrases, typeSpeed, deleteSpeed, holdTime]);

  return { text, reduced };
}
