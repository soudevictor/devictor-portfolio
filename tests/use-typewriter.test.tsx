import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useTypewriter } from "@/hooks/useTypewriter";

const PHRASES = ["interfaces em React & Next.js", "sistemas B2B em escala"];

function mockReducedMotion(matches: boolean) {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

/**
 * Avança o relógio em passos pequenos, cada um dentro de `act()`. O hook agenda
 * o próximo passo num efeito, então um salto grande só dispararia o primeiro
 * timer — o re-render precisa acontecer antes do seguinte ser agendado.
 */
function advance(totalMs: number, stepMs = 5) {
  let elapsed = 0;
  while (elapsed < totalMs) {
    const step = Math.min(stepMs, totalMs - elapsed);
    act(() => {
      vi.advanceTimersByTime(step);
    });
    elapsed += step;
  }
}

describe("useTypewriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("com reduced-motion entrega a primeira frase estática, sem oscilar", () => {
    mockReducedMotion(true);

    const { result } = renderHook(() =>
      useTypewriter({ phrases: PHRASES, typeSpeed: 20, holdTime: 50 }),
    );

    advance(3000);

    expect(result.current.reduced).toBe(true);
    expect(result.current.text).toBe(PHRASES[0]);
  });

  it("mostra a primeira frase de imediato (sem linha em branco no load)", () => {
    mockReducedMotion(false);

    const { result } = renderHook(() =>
      useTypewriter({ phrases: PHRASES, typeSpeed: 50 }),
    );

    // O fallback anti-vazio já entrega a frase completa antes do ciclo.
    expect(result.current.text).toBe(PHRASES[0]);
  });

  it("apaga a primeira frase e digita a segunda", () => {
    mockReducedMotion(false);

    const { result } = renderHook(() =>
      useTypewriter({
        phrases: PHRASES,
        typeSpeed: 10,
        deleteSpeed: 10,
        holdTime: 100,
      }),
    );

    expect(result.current.text).toBe(PHRASES[0]);

    // Segura (holdTime) e apaga tudo, um caractere por tick.
    advance(100 + PHRASES[0]!.length * 10);
    expect(result.current.text).toBe("");

    // Digita a segunda frase até o fim.
    advance(PHRASES[1]!.length * 10 + 30);
    expect(result.current.text).toBe(PHRASES[1]);
  });

  it("circula de volta para a primeira frase", () => {
    mockReducedMotion(false);

    const { result } = renderHook(() =>
      useTypewriter({
        phrases: PHRASES,
        typeSpeed: 10,
        deleteSpeed: 10,
        holdTime: 100,
      }),
    );

    // Um ciclo completo: apagar frase 1 + digitar frase 2 + apagar frase 2.
    advance(
      100 +
        PHRASES[0]!.length * 10 +
        PHRASES[1]!.length * 10 +
        100 +
        PHRASES[1]!.length * 10,
    );

    // De volta à primeira, digitando do zero.
    expect(PHRASES[0]!.startsWith(result.current.text)).toBe(true);
  });

  it("nunca deixa o texto passar da frase atual", () => {
    mockReducedMotion(false);

    const { result } = renderHook(() =>
      useTypewriter({ phrases: PHRASES, typeSpeed: 5 }),
    );

    for (let i = 0; i < 30; i++) {
      advance(25);
      expect(result.current.text.length).toBeLessThanOrEqual(PHRASES[0]!.length);
    }
  });
});
