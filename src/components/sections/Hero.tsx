import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/sections/Typewriter";
import { copy, site } from "@/data/social";

/**
 * Hero da coluna de leitura. Nome em tamanho grande, papel (cargo), o typewriter
 * como live thing e as ações. Alinhado à esquerda conforme a direction
 * (split-stage), não centrado como dizia o blueprint do hero.
 *
 * "Disponível para projetos" é status (ponto + texto) acima das ações, não um
 * eyebrow acima do heading — a regra da casa proíbe o rótulo sobre o título.
 * No mobile o bloco é natural e alinhado ao topo para a ação caber na primeira
 * tela; no desktop ocupa a altura com centralização calma.
 *
 * Sem `Reveal` aqui de propósito: o hero é a primeira pintura e o heading é o
 * candidato a LCP. Escondê-lo até a hidrataria disparar atrasa o LCP em
 * segundos em conexões lentas. A entrada animada fica para o que rola para
 * dentro da viewport (Sobre, Stack, Projetos, Contato).
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-title"
      className="flex flex-col justify-center pt-28 pb-16 lg:min-h-[100svh] lg:py-24"
    >
      <h1
        id="inicio-title"
        className="text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.95] font-semibold tracking-tight text-[var(--ink)]"
      >
        {site.name}
      </h1>

      <p className="mt-3 text-[clamp(1.25rem,3vw,1.75rem)] font-medium text-[var(--accent)]">
        {site.role}
      </p>

      <p className="mt-6 min-h-[1.75rem] text-lg text-[var(--ink-soft)]">
        <span className="sr-only">{copy.hero.typing[0]}</span>
        <Typewriter phrases={[...copy.hero.typing]} aria-hidden="true" />
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] bg-[var(--accent)] motion-safe:animate-[caret-blink_1.05s_steps(1,end)_infinite]"
        />
      </p>

      {/* Status: ponto + disponibilidade. Vivo, não é decoração. */}
      <p className="mt-8 flex items-center gap-2 text-sm text-[var(--ink-soft)]">
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]"
        />
        {copy.hero.badge}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button href="#contato" size="lg">
          {copy.hero.primaryCta}
        </Button>
        <Button href="#projetos" variant="secondary" size="lg">
          {copy.hero.secondaryCta}
        </Button>
      </div>
    </section>
  );
}
