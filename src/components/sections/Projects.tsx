import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { projects } from "@/data/projects";

/**
 * Projetos — quebra o split-stage e roda em largura total (a direction pede
 * ao menos uma seção assim). A logomarca de cada produto lidera; o texto
 * fica abaixo, não sobre a imagem. Sem cards idênticos: cada projeto é uma
 * faixa com a imagem dominante.
 */
export function Projects() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="bg-[var(--surface-2)] py-24 md:py-28"
    >
      <Container>
        <Reveal>
          <h2
            id="projetos-title"
            className="mb-12 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl"
          >
            Projetos
          </h2>
        </Reveal>

        <div className="space-y-20">
          {projects.map((project) => (
            <Reveal key={project.title}>
              <article>
                <div className="overflow-hidden">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    sizes="(min-width: 1024px) 90vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>

                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-[52ch]">
                    <h3 className="text-2xl font-semibold tracking-tight text-[var(--ink)]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-[var(--ink-soft)]">{project.subtitle}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">
                      {project.kind}
                    </p>
                    <p className="mt-4 leading-relaxed text-[var(--ink)]">
                      {project.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tech, index) => (
                        <Tag key={tech} highlight={index === 0} raised>
                          {tech}
                        </Tag>
                      ))}
                    </ul>
                  </div>

                  <div className="flex shrink-0 gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded bg-[var(--accent-fill)] px-4 py-2 text-sm font-medium text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-fill-hover)]"
                      >
                        Ver projeto
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--border)]"
                      >
                        Ver código
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
