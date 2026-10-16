import { Mail } from "lucide-react";

import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { sections, site, social } from "@/data/social";

const icons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  mail: Mail,
} as const;

/**
 * Fecho desenhado da página: o nome volta em largura total como âncora
 * visual, com a navegação e os sociais ao redor. Não é um sitemap.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-2)] py-14">
      <Container>
        <p
          aria-hidden="true"
          className="text-5xl font-semibold tracking-tight text-[var(--ink)] md:text-7xl"
        >
          {site.shortName}
        </p>

        <p className="mt-4 max-w-md text-[var(--ink-soft)]">
          {site.role} — construindo interfaces com o pé no back-end.
        </p>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-3">
            {social.map((link) => {
              const Icon = icons[link.icon];
              const isExternal = link.href.startsWith("http");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex h-10 w-10 items-center justify-center rounded text-[var(--ink-soft)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-10 text-sm text-[var(--ink-soft)]">
          © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
