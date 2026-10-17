import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { copy, site, stats } from "@/data/social";

/**
 * Sobre — carta em primeira pessoa (blueprint "Founder's letter").
 * Coluna estreita, sem heading visível, assinatura discreta. O texto vem da
 * fonte canônica (`copy.about` em social.ts), nunca duplicado aqui. Os stats
 * vêm logo abaixo, como linhas de números discretas.
 */
export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="py-16 md:py-24">
      <Container>
        <div className="max-w-[46ch]">
          <h2 id="sobre-title" className="sr-only">
            {copy.about.title}
          </h2>

          <Reveal>
            {copy.about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 text-lg leading-relaxed text-[var(--ink)] first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={70}>
            <p className="mt-8 text-[var(--ink-soft)]">
              <span className="italic text-[var(--ink)]">{site.name}</span>
              <br />
              <span className="text-sm">{site.role}</span>
            </p>
          </Reveal>
        </div>

        {/* Linhas de números — figuras discretas, sem elevar a voz. */}
        <Reveal delay={140}>
          <dl className="mt-16 max-w-2xl">
            {stats.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-[104px_1fr] items-baseline gap-6 py-6 md:grid-cols-[132px_1fr]"
              >
                <dt className="whitespace-nowrap text-right text-2xl font-semibold tabular-nums text-[var(--ink)] md:text-3xl">
                  {s.value}
                </dt>
                <dd className="text-[var(--ink-soft)]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={210}>
          <a
            href={copy.about.cvHref}
            download
            className="mt-10 inline-block text-[var(--accent)] underline-offset-4 hover:underline"
          >
            {copy.about.cvLabel}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
