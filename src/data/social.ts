/**
 * Identidade, links e copy central do site. Uma fonte única de verdade —
 * mudar um texto ou um link aqui não toca em nenhum componente.
 */

export interface SocialLink {
  label: string;
  href: string;
  /** Nome curto do ícone Lucide, usado pelo Footer/Contato. */
  icon: "github" | "linkedin" | "mail";
}

export const site = {
  name: "João Victor Carvalho",
  shortName: "Devictor",
  /** Posicionamento público confirmado em 2026-10-23. */
  role: "Desenvolvedor Front-End",
  url: "https://soudevictor.vercel.app",
  description:
    "Portfólio de João Victor Carvalho, desenvolvedor front-end. Interfaces em React, Next.js e Angular, com foco em produto, acessibilidade e performance.",
  email: "trabalho.joaovictor2004@gmail.com",
} as const;

export const social: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/soudevictor",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/soudevictor",
    icon: "linkedin",
  },
  {
    label: "E-mail",
    href: `mailto:${site.email}`,
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
 * Copy das seções, com posicionamento front-end.
 * A força vem do front-end B2B: componentes, design systems e interfaces
 * de produto. O estudo de back-end não é anunciado como posicionamento.
 */
export const copy = {
  hero: {
    badge: "Disponível para projetos",
    /** Frases do typewriter da hero. */
    typing: [
      "interfaces em React & Next.js",
      "tipagem de ponta a ponta com TypeScript",
      "arquitetura de componentes escalável",
      "design systems e acessibilidade",
    ],
    primaryCta: "Vamos conversar",
    secondaryCta: "Ver projetos",
  },
  about: {
    title: "Sobre mim",
    paragraphs: [
      "Sou desenvolvedor com forte base no ecossistema TypeScript, Angular e React, e foco em engenharia de plataformas B2B. Tenho histórico prático em arquiteturas orientadas a componentes, consumo de APIs RESTful e resolução de gargalos de performance em sistemas de alta complexidade, sob metodologias ágeis (Scrum).",
      "Sou autodidata e movido pela curiosidade de entender como as coisas funcionam. Gosto de transformar problemas complexos em interfaces claras, rápidas e acessíveis, cuidando do detalhe que separa uma tela funcional de um produto que dá gosto de usar.",
    ],
    cvLabel: "Baixar currículo",
    cvHref: "/curriculo.pdf",
  },
  contact: {
    title: "Entre em contato",
    subtitle:
      "Tem um projeto em mente ou quer bater um papo sobre front-end, produto e interfaces? Me manda uma mensagem.",
  },
} as const;

/** Indicadores de impacto exibidos na seção "Sobre". */
export const stats = [
  { value: "+9", label: "Sprints ágeis" },
  { value: "+4", label: "Módulos core entregues" },
  { value: "+29", label: "Gargalos e bugs resolvidos" },
  { value: "R$ 3M+", label: "Em dados fiscais processados" },
] as const;
