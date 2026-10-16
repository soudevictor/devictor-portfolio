/**
 * Projetos do portfólio — fonte única de verdade.
 *
 * O schema já é preparado para full-stack: `category` distingue frontend/
 * fullstack/backend e `stack` guarda a stack completa. Adicionar o primeiro
 * projeto full-stack no futuro = uma entrada nova neste array, nenhum
 * componente muda.
 */

export type ProjectCategory = "frontend" | "fullstack" | "backend";

export interface Project {
  title: string;
  /** Linha curta sob o título. */
  subtitle: string;
  description: string;
  category: ProjectCategory;
  /** Rótulo do tipo exibido no card (ex.: "SaaS B2B · IA"). */
  kind: string;
  stack: string[];
  /** URL do logo/thumbnail em `public/`. */
  logo?: string;
  /** Screenshot real da interface no ar, em `public/images/work/`. */
  screenshot?: string;
  repoUrl?: string;
  liveUrl?: string;
  /** Ordenação; os de maior destaque vêm primeiro. */
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "Talent Metrics",
    subtitle: "Plataforma de Triagem com IA para RH",
    description:
      "Plataforma B2B para times de RH com triagem automatizada de currículos via IA. Landing page institucional de alta conversão e playground interativo com parsing client-side de PDFs, inferência em tempo real com Groq AI (Llama 3.3 70B), relatórios de fit e histórico de candidatos persistido localmente.",
    category: "frontend",
    kind: "SaaS B2B · IA",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Groq AI",
      "Vercel AI SDK",
      "Zod",
      "Vitest",
    ],
    logo: "/images/thumbnails/talentmetricsLogo.svg",
    screenshot: "/images/work/talentmetrics.png",
    liveUrl: "https://talent-metrics-landing.vercel.app/",
    repoUrl: "https://github.com/soudevictor/talent-metrics-landing",
    featured: true,
  },
  {
    title: "Axiom ERP",
    subtitle: "Suíte B2B de Supply Chain & Tesouraria",
    description:
      "Sistema corporativo de alta densidade para gestão de estoque multi-armazém e fluxo financeiro. Reatividade granular com Angular Signals, persistência NoSQL local com Dexie.js (IndexedDB), DataGrid a 60 FPS via CDK Virtual Scroll (1.000+ itens) e command palette global.",
    category: "frontend",
    kind: "ERP Corporativo · Supply Chain",
    stack: [
      "Angular",
      "TypeScript",
      "@ngrx/signals",
      "Tailwind CSS",
      "Dexie.js",
      "CDK Virtual Scroll",
      "Vitest",
    ],
    logo: "/images/thumbnails/axiomerpLogo.svg",
    screenshot: "/images/work/axiomerp.png",
    liveUrl: "https://axiomerp.vercel.app/",
    repoUrl: "https://github.com/soudevictor/axiom-erp",
    featured: true,
  },
];
