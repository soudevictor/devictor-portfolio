# Spec: Migração e Redesign do Portfólio Devictor (Vanilla → React)

## Objective

Migrar o portfólio pessoal de João Victor Carvalho de HTML/Sass/JS vanilla para uma aplicação React moderna, com novo design e código reestruturado, com o objetivo de **conseguir emprego e consolidar a transição de front-end para full-stack**. O site é a principal vitrine técnica do autor — ele mesmo é uma demonstração de competência.

**Posicionamento: Desenvolvedor Full-Stack.** Todo o copy, a hero, a seção "sobre" e os metadados de SEO comunicam full-stack desde já (não "front-end que vira full-stack um dia"). A arquitetura de dados e de UI é projetada para que adicionar o primeiro projeto full-stack no futuro seja uma mudança de **dados, não de código**: o modelo `Project` já suporta categorias, stack completa (front/back/banco/infra) e destaque, e o grid de projetos já prevê filtros/tags.

**Usuários-alvo:** recrutadores técnicos, tech leads e contratantes que visitam o site a partir de LinkedIn, GitHub e currículo.

**Sucesso significa:**
- Recrutador entende em < 10 segundos que é um dev **full-stack**, o que ele faz e como contatá-lo.
- O próprio site demonstra domínio de React, TypeScript, acessibilidade e performance (métricas Lighthouse abaixo).
- Seções: `#inicio` (hero), `#sobre`, `#stack` (Stack Técnica, inclui trilha back-end), `#projetos`, `#contato` — conteúdo revisado com narrativa full-stack.
- Adicionar um projeto novo (incl. full-stack) = editar `src/data/projects.ts`, zero mudança estrutural.

## Assumptions (corrija agora ou sigo com elas)

1. **Framework: Next.js 15 (App Router) + TypeScript** — é o padrão de mercado para front-end/React, SSG nativo ideal para portfólio, deploy 1-clique na Vercel. Alternativa seria Vite + React puro; escolhi Next.js pelo SEO e pela narrativa de currículo.
2. **Estilização: Tailwind CSS v4** — substitui o Sass; padrão de mercado, facilita design system consistente e dark/light mode.
3. **Animações: CSS + IntersectionObserver** (componente `Reveal`), sem lib de motion — anima só `transform`/`opacity`, zero JS por frame, e o conteúdo permanece visível sem script (fallback honesto). Typed.js substituído por um hook/componente próprio de typewriter (~30 linhas, sem dependência). *Decisão revisada em 2026-10-16: a suposição original previa Motion (Framer Motion); o custo em bundle/performance para entradas simples não se justificou.*
4. **Formulário: mantém Web3Forms** como backend de envio (sem servidor próprio), mas com React Hook Form + validação (zod).
5. **Font Awesome substituído por Lucide React** (ícones SVG tree-shakeable, sem CSS externo).
6. **Idioma do site: pt-BR** (como hoje). Multilíngue fica fora do escopo.
7. **Sem banco de dados e sem CMS** — projetos ficam em um arquivo de dados tipado (`src/data/projects.ts`), com schema já pensado para full-stack (ver abaixo).
8. **Navegadores modernos apenas** (sem IE11).
9. O site antigo será substituído; o conteúdo atual (textos, imagens, projetos) será migrado e revisado.
10. **Domínio:** mantém `soudevictor.vercel.app`.
11. **Blog:** fora do escopo inicial, mas a arquitetura (App Router) permite adicionar `/blog` depois sem refatoração.
12. **Currículo:** um novo PDF será fornecido pelo autor e trocado em `public/` — o site linka para um caminho estável (`/curriculo.pdf`) para a troca ser trivial. Foto/avatar atual é reutilizado.

### Modelo de dados de projetos (preparado para full-stack)

```ts
type ProjectCategory = "frontend" | "fullstack" | "backend";

interface Project {
  title: string;
  description: string;
  category: ProjectCategory;      // filtros/tags prontos para full-stack
  stack: string[];                // ex.: ["Next.js", "Node", "PostgreSQL"]
  repoUrl?: string;
  liveUrl?: string;
  /** Screenshot real da interface no ar, em `public/images/work/`. */
  screenshot?: string;
  featured: boolean;
}
```

Adicionar o primeiro projeto full-stack no futuro = uma entrada nova nesse array. Nenhum componente muda.

## Tech Stack

- Next.js 15 (App Router, static export) + React 19 + TypeScript strict
- Tailwind CSS v4 (tokens de design via CSS variables, dark/light com `prefers-color-scheme` + toggle persistido)
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
  app/             → App Router (layout, page, metadata/SEO)
  components/
    ui/            → Botões, tipografia, containers primitivos
    sections/      → Hero, About, Projects, Contact
    layout/        → Header, Footer, ThemeToggle
  data/            → projects.ts, social.ts (conteúdo tipado)
  hooks/           → useTypewriter, useTheme
  lib/             → schemas de validação (zod)
  styles/          → globals.css (tokens Tailwind)
public/            → imagens otimizadas (migradas de assets/)
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
    <article className="group rounded-2xl border border-border bg-surface p-6">
      <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
      {/* ... */}
    </article>
  );
}
```

## Testing Strategy

- **Vitest + Testing Library** para componentes-chave (Header, ThemeToggle, formulário, typewriter).
- **axe-core** para checagem automatizada de acessibilidade por seção (o contraste é medido no browser pela inspeção, não no jsdom).
- **Lighthouse CI (local, manual)** antes do deploy — metas abaixo.
- Cobertura-alvo: componentes interativos 100% testados; não exigir cobertura global.

## Design Direction

Referências de norte estético: portfólios consagrados de devs de produto/engenharia (estilo de rauno.me, leerob.io, bento.dev) — minimalista, tipografia forte, espaçamento generoso, micro-interações sutis, foco no conteúdo. Sem templates genéricos; dark e light como cidadãos de primeira classe.

## Boundaries

- **Always:** TypeScript strict, lint+format antes de commit, imagens otimizadas, todo elemento interativo acessível por teclado, contraste AA.
- **Ask first:** adicionar dependência nova, mudar stack definida acima, alterar/remover seções, comprar assets pagos.
- **Never:** commitar chaves/segredos (Web3Forms key via env), copiar código/design de referências, usar imagens sem licença, manter código morto do site antigo.

## Success Criteria (mensuráveis)

- Lighthouse (mobile): **Performance ≥ 95, Acessibilidade = 100, Best Practices = 100, SEO = 100**.
- LCP < 2.0s, CLS < 0.05, INP < 200ms (INP afere-se por proxy de laboratório — TBT — no Lighthouse local, já que exige sessão real).
- Navegação completa apenas por teclado, com foco visível; leitores de tela anunciam todas as seções (landmarks + labels).
- Dark/light mode com toggle + respeito a `prefers-color-scheme`, sem flash de tema no carregamento.
- Zero erros de lint/typecheck; build de produção estático passando.
- Formulário de contato enviando com sucesso via Web3Forms, com estados de loading/sucesso/erro.
- Deploy na Vercel em produção, apontando para o domínio atual.

## Decisions log (spec viva)

Alterações feitas após revisão do estado implementado (2026-10-16):

- **Animação:** Motion (Framer Motion) → `Reveal` em CSS + IntersectionObserver. A dependência `motion` foi **removida** do `package.json`.
- **Modelo de `Project`:** o campo `image` da suposição original virou `screenshot` (interface real no ar). O campo `logo` foi **removido** por não ter consumidor honesto — os logos migrados são wordmarks que duplicariam o título.
- **Consumo de dados:** `category` (chip de categoria) e `featured` (ordenação) passaram a ser **usados** na seção Projetos, fechando o critério "tags de categoria".
- **Acessibilidade:** todas as `<section>` ganharam `aria-labelledby` apontando para o título, para virarem landmarks nomeados.
- **Primitivos UI:** `Section.tsx` foi removido (código morto — o Hero não pode usá-lo); `Tag.tsx` passa a ser usado em Stack e Projetos.
- **Logo da marca:** Header e Footer passam a usar a logo em vez do wordmark de texto, trocando com o tema — `Devictor_LogoPreta.svg` no claro, `Devictor_LogoBranca.svg` no escuro. Para isso o Tailwind v4 ganhou o variant de classe `@custom-variant dark (&:where(.dark, .dark *))`, que liga `dark:` à classe `.dark` aplicada no `<html>`.
- **Palco (Stage):** deixou de trocar de mídia conforme a seção entra em vista. Agora é um retrato fixo (`img01.webp`) — sem carrossel involuntário no scroll e sem JS de cliente. `background.mp4`/`background.webp` ficaram sem uso, anotados como candidatos a mídia futura.
- **Retrato:** `img01.jpeg` (que não existia — imagem quebrada) passou a apontar para `img01.webp`, inclusive na metadata OG/Twitter, agora com as dimensões reais (1024×1024).
- **Social:** o Instagram foi removido do rodapé; a união `SocialLink.icon` foi alinhada a `"github" | "linkedin" | "mail"`.

## Open Questions

Nenhuma pendente — decisões registradas nas Assumptions (domínio mantido, projetos atuais migrados, novo currículo a caminho, foto reutilizada, blog fora do escopo inicial).

**Posicionamento confirmado (autor, 2026-10-16):** o título público é "João Victor Carvalho — Desenvolvedor Full-Stack". A hero e o SEO comunicam full-stack mesmo com os projetos atuais sendo front-end. A arquitetura de dados (`Project.category`, `stack[]`) já absorve o primeiro projeto full-stack como mudança de dados, não de código.
