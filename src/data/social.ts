/**
 * Identidade, links e copy central do site. Uma fonte única de verdade —
 * mudar um texto ou um link aqui não toca em nenhum componente.
 */

export interface SocialLink {
  label: string;
  href: string;
  /** Nome curto do ícone Lucide, usado pelo Footer/Contato. */
  icon: "github" | "linkedin" | "instagram" | "mail";
}

export const site = {
  name: "João Victor Carvalho",
  shortName: "Devictor",
  /** Posicionamento confirmado: full-stack desde já. */
  role: "Desenvolvedor Full-Stack",
  url: "https://soudevictor.vercel.app",
  description:
    "Portfólio de João Victor Carvalho, desenvolvedor full-stack. Interfaces em React e Next.js, com trilha back-end em construção.",
  email: "contato@soudevictor.dev",
  location: "Brasil",
} as const;

export const social: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/0Carvalh0",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/soudevictor",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/soudevictor",
    icon: "instagram",
  },
  {
    label: "E-mail",
    href: "mailto:contato@soudevictor.dev",
    icon: "mail",
  },
];

/** Seções do site, na ordem da navegação. */
export const sections = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "stack", label: "Stack" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;
