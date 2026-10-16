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

/**
 * Copy das seções, revisado com a narrativa full-stack.
 * A força vem do front-end B2B; o back-end entra como direção honesta
 * (a seção Stack mostra a trilha em progresso), sem inflar o que ainda não
 * existe em produção.
 */
export const copy = {
  hero: {
    badge: "Disponível para projetos",
    /** Frases do typewriter da hero. */
    typing: [
      "interfaces em React & Next.js",
      "tipagem de ponta a ponta com TypeScript",
      "arquitetura de componentes escalável",
      "trilha back-end em construção",
    ],
    primaryCta: "Vamos conversar",
    secondaryCta: "Ver projetos",
  },
  about: {
    title: "Sobre mim",
    paragraphs: [
      "Sou desenvolvedor com forte base no ecossistema TypeScript, Angular e React, e foco em engenharia de plataformas B2B. Tenho histórico prático em arquiteturas orientadas a componentes, consumo de APIs RESTful e resolução de gargalos de performance em sistemas de alta complexidade, sob metodologias ágeis (Scrum).",
      "Sou autodidata e movido pela curiosidade de entender como as coisas funcionam. Essa mesma curiosidade é o que me leva do front-end para o back-end: estou construindo a trilha de servidor, banco de dados e infraestrutura para fechar o ciclo full-stack de verdade, começando por este site.",
    ],
    cvLabel: "Baixar currículo",
    cvHref: "/curriculo.pdf",
  },
  contact: {
    title: "Entre em contato",
    subtitle:
      "Tem um projeto em mente ou quer bater um papo sobre front-end, back-end ou a virada full-stack? Me manda uma mensagem.",
  },
} as const;

/** Indicadores de impacto exibidos na seção "Sobre". */
export const stats = [
  { value: "+9", label: "Sprints ágeis" },
  { value: "+4", label: "Módulos core entregues" },
  { value: "+29", label: "Gargalos e bugs resolvidos" },
  { value: "R$ 3M+", label: "Em dados fiscais processados" },
] as const;
