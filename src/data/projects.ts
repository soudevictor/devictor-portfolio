/**
 * Projetos do portfólio — fonte única de verdade.
 *
 * Cada projeto carrega a própria imagem com dimensões reais e `alt` honesto.
 * Hoje os arquivos são logomarcas, não screenshots de interface; o texto deve
 * dizer isso. Adicionar um projeto é uma entrada nova neste array.
 */

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Project {
  title: string;
  /** Linha curta sob o título. */
  subtitle: string;
  description: string;
  /** Rótulo do tipo exibido no card (ex.: "SaaS B2B · IA"). */
  kind: string;
  stack: string[];
  /** Logomarca do projeto em `public/images/work/`. */
  image: ProjectImage;
  repoUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Talent Metrics",
    subtitle: "Plataforma de Triagem com IA para RH",
    description:
      "Plataforma B2B para times de RH com triagem automatizada de currículos via IA. Landing page institucional de alta conversão e playground interativo com parsing client-side de PDFs, inferência em tempo real com Groq AI (Llama 3.3 70B), relatórios de fit e histórico de candidatos persistido localmente.",
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
    image: {
      src: "/images/work/talentmetrics.webp",
      width: 1280,
      height: 640,
      alt: "Logomarca do Talent Metrics",
    },
    liveUrl: "https://talent-metrics-landing.vercel.app/",
    repoUrl: "https://github.com/soudevictor/talent-metrics-landing",
  },
  {
    title: "Axiom ERP",
    subtitle: "Suíte B2B de Supply Chain & Tesouraria",
    description:
      "Sistema corporativo de alta densidade para gestão de estoque multi-armazém e fluxo financeiro. Reatividade granular com Angular Signals, persistência NoSQL local com Dexie.js (IndexedDB), DataGrid a 60 FPS via CDK Virtual Scroll (1.000+ itens) e command palette global.",
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
    image: {
      src: "/images/work/axiomerp.webp",
      width: 1280,
      height: 640,
      alt: "Logomarca do Axiom ERP",
    },
    liveUrl: "https://axiomerp.vercel.app/",
    repoUrl: "https://github.com/soudevictor/axiom-erp",
  },
];
