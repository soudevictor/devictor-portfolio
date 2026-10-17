/**
 * Stack técnica — dados da seção `#stack`.
 *
 * A trilha "Back-end & Infra" entra como direção full-stack em progresso,
 * alinhada ao posicionamento do site. Cada `highlight` ganha maior peso
 * visual sem virar card de ícone.
 */

export interface StackItem {
  name: string;
  highlight?: boolean;
}

export interface StackCategory {
  title: string;
  items: StackItem[];
  /** Marcador de trilha em construção (back-end). */
  inProgress?: boolean;
}

export const stack: StackCategory[] = [
  {
    title: "Linguagens & Core",
    items: [
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)" },
      { name: "HTML5 Semântico" },
      { name: "CSS3 Moderno" },
    ],
  },
  {
    title: "Frameworks & Libs",
    items: [
      { name: "Next.js (App Router)", highlight: true },
      { name: "React", highlight: true },
      { name: "Angular (Signals)", highlight: true },
      { name: "@ngrx/signals" },
      { name: "RxJS" },
    ],
  },
  {
    title: "Estilização & Design",
    items: [
      { name: "Tailwind CSS", highlight: true },
      { name: "Design Systems" },
      { name: "Tokens Semânticos" },
      { name: "Flexbox & CSS Grid" },
      { name: "Mobile-First" },
      { name: "Figma" },
    ],
  },
  {
    title: "Back-end & Infra",
    inProgress: true,
    items: [
      { name: "Node.js" },
      { name: "REST APIs" },
      { name: "PostgreSQL" },
      { name: "Prisma" },
      { name: "Git & CI/CD" },
      { name: "Docker" },
      { name: "Vercel" },
    ],
  },
];
