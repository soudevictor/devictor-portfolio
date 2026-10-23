# Spec: Migração e Redesign do Portfólio Devictor (Vanilla → React)

## Objective

Migrar o portfólio pessoal de João Victor Carvalho de HTML/Sass/JS vanilla para uma aplicação React moderna, com novo design e código reestruturado, com o objetivo de **conseguir emprego como desenvolvedor front-end**. O site é a principal vitrine técnica do autor — ele mesmo é uma demonstração de competência.

**Posicionamento: Desenvolvedor Front-End.** Todo o copy, a hero, a seção "sobre" e os metadados de SEO comunicam front-end. O autor estuda back-end, mas o site não promete uma transição nem usa "full-stack" como posicionamento público. A arquitetura de dados é simples e honesta: cada projeto tem stack, links e uma imagem com `alt` correspondente ao que aparece.

**Usuários-alvo:** recrutadores técnicos, tech leads e contratantes que visitam o site a partir de LinkedIn, GitHub e currículo.

**Sucesso significa:**

- Recrutador entende em < 10 segundos que é um dev **front-end**, o que ele faz e como contatá-lo.
- O próprio site demonstra domínio de React, TypeScript, acessibilidade e performance (métricas Lighthouse abaixo).
- Seções: `#inicio` (hero), `#sobre`, `#stack` (Stack Técnica front-end), `#projetos`, `#contato`.
- Adicionar um projeto novo = editar `src/data/projects.ts`, incluindo dimensões e `alt` da imagem, zero mudança estrutural.

## Assumptions (corrija agora ou sigo com elas)

1. **Framework: Next.js 15 (App Router) + TypeScript** — é o padrão de mercado para front-end/React, SSG nativo ideal para portfólio, deploy 1-clique na Vercel. Alternativa seria Vite + React puro; escolhi Next.js pelo SEO e pela narrativa de currículo.
2. **Estilização: Tailwind CSS v4** — substitui o Sass; padrão de mercado, facilita design system consistente. O site é **dark-only** desde 2026-10-23; não há toggle, tema claro, `prefers-color-scheme` nem persistência de tema.
3. **Animações: CSS + IntersectionObserver** (componente `Reveal`), sem lib de motion — anima só `transform`/`opacity`, zero JS por frame, e o conteúdo permanece visível sem script (fallback honesto). Typed.js substituído por um hook/componente próprio de typewriter (~30 linhas, sem dependência). _Decisão revisada em 2026-10-16: a suposição original previa Motion (Framer Motion); o custo em bundle/performance para entradas simples não se justificou._
4. **Formulário: mantém Web3Forms** como backend de envio (sem servidor próprio), mas com React Hook Form + validação (zod).
5. **Font Awesome substituído por Lucide React** (ícones SVG tree-shakeable, sem CSS externo).
6. **Idioma do site: pt-BR** (como hoje). Multilíngue fica fora do escopo.
7. **Sem banco de dados e sem CMS** — projetos ficam em um arquivo de dados tipado (`src/data/projects.ts`), com schema focado no que a UI consome (ver abaixo).
8. **Navegadores modernos apenas** (sem IE11).
9. O site antigo será substituído; o conteúdo atual (textos, imagens, projetos) será migrado e revisado.
10. **Domínio:** mantém `soudevictor.vercel.app`.
11. **Blog:** fora do escopo inicial, mas a arquitetura (App Router) permite adicionar `/blog` depois sem refatoração.
12. **Currículo:** PDF disponível em `public/curriculo.pdf` e linkado pelo caminho estável `/curriculo.pdf`; a troca do arquivo não exige mudança no código. Foto/avatar atual é reutilizado.

### Modelo de dados de projetos

```ts
interface Project {
  title: string;
  subtitle: string;
  description: string;
  kind: string; // ex.: "SaaS B2B · IA"
  stack: string[];
  image: {
    src: string; // arquivo em `public/images/work/`
    width: number; // dimensões reais do arquivo
    height: number;
    alt: string; // descreve o que aparece: interface ou logomarca
  };
  repoUrl?: string;
  liveUrl?: string;
}
```

Adicionar um projeto novo = uma entrada nova nesse array, com dimensões reais e `alt` honesto. Nenhum componente muda.

## Tech Stack

- Next.js 15 (App Router, static export) + React 19 + TypeScript strict
- Tailwind CSS v4 (tokens de design via CSS variables, dark-only com `color-scheme: dark`)
- Animações de entrada em CSS + IntersectionObserver (`Reveal`), Lucide React (ícones), React Hook Form + zod + Web3Forms (contato)
- ESLint + Prettier; fontes via `next/font` (sem render-blocking)

## Commands

```
Dev:    npm run dev
Build:  npm run build
Lint:   npm run lint --fix
Format: npm run format
Test:   npm run test
```

## Project Structure

```
src/
  app/             → App Router (layout, page, not-found, sitemap, robots)
  components/
    ui/            → Botões, tipografia, containers primitivos
    sections/      → Hero, About, Projects, Contact
    layout/        → Header, Footer
  data/            → projects.ts, social.ts, stack.ts (conteúdo tipado)
  hooks/           → useTypewriter, usePrefersReducedMotion
  lib/             → schemas de validação (zod)
  styles/          → globals.css (tokens Tailwind dark-only)
public/            → imagens, currículo e favicon
tests/             → testes unitários (Vitest) e de acessibilidade
```

## Code Style

- TypeScript strict, componentes funcionais nomeados, server components por padrão e `"use client"` só onde há interatividade.
- Um componente por arquivo, nome em PascalCase; props tipadas com `interface`.
- Classes Tailwind ordenadas (prettier-plugin-tailwindcss); nada de CSS inline ou estilos globais soltos.

```tsx
interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group border-border bg-surface rounded-2xl border p-6">
      <h3 className="text-foreground text-xl font-semibold">{project.title}</h3>
      {/* ... */}
    </article>
  );
}
```

## Testing Strategy

- **Vitest + Testing Library** para componentes-chave (Header, formulário, typewriter, projetos, 404).
- **axe-core** para checagem automatizada de acessibilidade por seção (o contraste é medido no browser pela inspeção, não no jsdom).
- **Lighthouse CI (local, manual)** antes do deploy — metas abaixo.
- Cobertura-alvo: componentes interativos 100% testados; não exigir cobertura global.

## Design Direction

Referências de norte estético: portfólios consagrados de devs de produto/engenharia (estilo de rauno.me, leerob.io, bento.dev) — minimalista, tipografia forte, espaçamento generoso, micro-interações sutis, foco no conteúdo. Sem templates genéricos. **Dark único** como decisão de marca: um só solo, uma só tinta, sem toggle e sem tema claro.

## Boundaries

- **Always:** TypeScript strict, lint+format antes de commit, imagens otimizadas, todo elemento interativo acessível por teclado, contraste AA.
- **Ask first:** adicionar dependência nova, mudar stack definida acima, alterar/remover seções, comprar assets pagos.
- **Never:** commitar chaves/segredos (Web3Forms key via env), copiar código/design de referências, usar imagens sem licença, manter código morto do site antigo.

## Success Criteria (mensuráveis)

- Lighthouse (mobile): **Performance ≥ 95, Acessibilidade = 100, Best Practices = 100, SEO = 100**.
- LCP < 2.0s, CLS < 0.05, INP < 200ms (INP afere-se por proxy de laboratório — TBT — no Lighthouse local, já que exige sessão real).
- Navegação completa apenas por teclado, com foco visível; leitores de tela anunciam todas as seções (landmarks + labels).
- Dark-only consistente: `color-scheme: dark`, sem toggle, sem tema claro e sem persistência de tema.
- Sem JavaScript, conteúdo principal e navegação continuam legíveis; o contato oferece fallback por e-mail.
- Zero erros de lint/typecheck; build de produção estático passando.
- Formulário de contato enviando com sucesso via Web3Forms, com estados de loading/sucesso/erro.
- Deploy na Vercel em produção, apontando para o domínio atual.

## Decisions log (spec viva)

Alterações feitas após revisão do estado implementado (2026-10-16):

- **Animação:** Motion (Framer Motion) → `Reveal` em CSS + IntersectionObserver. A dependência `motion` foi **removida** do `package.json`.
- **Modelo de `Project`:** o campo `image` da suposição original virou `screenshot` (interface real no ar). O campo `logo` foi **removido** por não ter consumidor honesto — os logos migrados são wordmarks que duplicariam o título. _(Substituído em 2026-10-23: o modelo voltou a `image` com `src`, `width`, `height` e `alt`.)_
- **Consumo de dados:** `category` (chip de categoria) e `featured` (ordenação) passaram a ser **usados** na seção Projetos, fechando o critério "tags de categoria". _(Removidos em 2026-10-23.)_
- **Acessibilidade:** todas as `<section>` ganharam `aria-labelledby` apontando para o título, para virarem landmarks nomeados.
- **Primitivos UI:** `Section.tsx` foi removido (código morto — o Hero não pode usá-lo); `Tag.tsx` passa a ser usado em Stack e Projetos.
- **Logo da marca:** Header e Footer passam a usar a logo em vez do wordmark de texto, trocando com o tema — `Devictor_LogoPreta.svg` no claro, `Devictor_LogoBranca.svg` no escuro. Para isso o Tailwind v4 ganhou o variant de classe `@custom-variant dark (&:where(.dark, .dark *))`, que liga `dark:` à classe `.dark` aplicada no `<html>`. _(Substituído em 2026-10-23: dark-only e apenas a logo branca.)_
- **Palco (Stage):** deixou de trocar de mídia conforme a seção entra em vista. Agora é um retrato fixo (`img01.webp`) — sem carrossel involuntário no scroll e sem JS de cliente. `background.mp4`/`background.webp` foram removidos do repositório.
- **Retrato:** `img01.jpeg` (que não existia — imagem quebrada) passou a apontar para `img01.webp`, inclusive na metadata OG/Twitter, agora com as dimensões reais (1024×1024).
- **Social:** o Instagram foi removido do rodapé; a união `SocialLink.icon` foi alinhada a `"github" | "linkedin" | "mail"`.

Revisão de 2026-10-23 (auditoria + decisões do autor):

- **Posicionamento:** full-stack → **front-end**. Removidos “full-stack” e “back-end” de cargo, SEO, hero, bio, contato, footer, keywords e Stack. A categoria “Back-end & Infra” saiu; a trilha de estudo continua sendo assunto pessoal, não promessa pública.
- **Tema:** dark/light com toggle → **dark-only**. Removidos `ThemeToggle`, `useTheme`, testes de tema, script de tema, `localStorage`, `.dark`, tokens claros, variantes `dark:` e a logo preta. `color-scheme: dark` no `:root`.
- **Projetos:** `category` e `featured` removidos por não terem consumidor real. A imagem passou a carregar `src`, `width`, `height` e `alt` nos dados. As imagens atuais são **logomarcas**, então o `alt` e o texto devem dizer isso; não são screenshots de interface.
- **CLS:** dimensões declaradas passam a bater com os arquivos (`1280×640`), eliminando o salto de ~122 px a 1024 px.
- **404:** página própria em pt-BR, com uma única metadata, `noindex`, mesmo tema e links de retorno. Header/Footer usam `/#secao` e a logo usa `/`, então a navegação também funciona fora da home.
- **Contato:** mensagens de erro amigáveis (sem JSON cru), timeout com `AbortController`, foco no estado de sucesso e no primeiro campo ao resetar, chave ausente tratada e fallback sem JS por `mailto`.
- **Sem JS:** typewriter começa com a primeira frase no HTML; menu mobile tem fallback nativo; formulário JS é ocultado e o fallback de e-mail aparece.
- **SEO:** `sitemap.xml`, `robots.txt`, `theme-color` e JSON-LD `Person`.
- **Docs:** `package.json` aponta para `https://github.com/soudevictor/devictor-portfolio`; referências à mídia antiga foram limpas.
- **P2 visual/motion:** o menu desktop e o painel mobile marcam a seção ativa; o painel mobile permanece montado para animar entrada/saída com `opacity` + `translate`, mas fica `aria-hidden`/`inert` quando fechado. Erros de contato usam os tokens semânticos `--danger`, `--danger-surface` e `--danger-border`, com anel de campo inválido.

## Open Questions

Nenhuma pendente para P0/P1/P2. O P2 visual/motion foi aprovado e aplicado em 2026-10-23; novas mudanças de direção visual continuam dependendo de validação do autor.

**Posicionamento confirmado (autor, 2026-10-23):** o título público é "João Victor Carvalho — Desenvolvedor Front-End". O site não comunica transição para full-stack.
