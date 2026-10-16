import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stack } from "@/data/stack";

/**
 * Stack Técnica — lista agrupada, sem cards (a direction proíbe grids de cards
 * na coluna de leitura). Cada categoria é uma linha com os itens; a trilha
 * back-end aparece marcada como em progresso.
 */
export function Stack() {
  return (
    <section id="stack" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <h2
            id="stack-title"
            className="mb-10 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl"
          >
            Stack Técnica
          </h2>
        </Reveal>

        {/* Cada Reveal É o <div> que agrupa o par dt/dd — o spec do <dl> exige
            que o div envoltório contenha dt/dd diretamente, sem aninhar outro. */}
        <dl className="max-w-3xl">
          {stack.map((category, index) => (
            <Reveal
              key={category.title}
              delay={index * 60}
              className="py-6"
            >
              <dt className="flex items-baseline gap-3">
                  <span className="font-medium text-[var(--ink)]">
                    {category.title}
                  </span>
                  {category.inProgress && (
                    <span className="text-sm text-[var(--accent)]">
                      em progresso
                    </span>
                  )}
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <li
                        key={item.name}
                        className={`rounded px-2.5 py-1 text-sm ${
                          item.highlight
                            ? "bg-[var(--accent)]/12 font-medium text-[var(--accent)]"
                            : "bg-[var(--surface-2)] text-[var(--ink-soft)]"
                        }`}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
