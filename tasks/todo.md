# Tarefas: Migração e Redesign do Portfólio Devictor

Base: `SPEC.md` + `tasks/plan.md`. Ordem por dependência.

> **Revisão de 2026-10-23:** as fases 1–8 registram a construção original e algumas decisões foram substituídas. Valem as decisões da Fase 9 e do `SPEC.md`: posicionamento **front-end**, tema **dark-only**, projetos com `image` (`src`, `width`, `height`, `alt`), sem `ThemeToggle`/`useTheme`, sem `category`/`featured` e sem promessa de full-stack.

## Fase 1 — Fundação

- [x] Task: Commitar estado final do site vanilla (últimas edições em index.html, _hero.scss, style.css)
  - Acceptance: working tree limpo antes do move para `legacy/`; histórico do site vanilla preservado no git
  - Verify: `git status` limpo; `git log` mostra o commit de fechamento
  - Files: `index.html`, `assets/javascript/index.js`, `assets/styles/css/style.css`, `assets/styles/sass/partials/_hero.scss`

- [x] Task: Mover site antigo para `legacy/` (preservar até deploy)
  - Acceptance: `index.html`, `assets/`, configs antigas dentro de `legacy/`; raiz limpa para o scaffold; SPEC.md e tasks/ intactos
  - Verify: `ls` na raiz não mostra arquivos do site antigo
  - Files: `index.html`, `assets/`, `package.json` antigo

- [x] Task: Migrar assets para `public/` (images, logos, thumbnails, favicon, vídeo, currículo)
  - Acceptance: `background.webp`, `img01.jpeg`, `logos/`, `thumbnails/`, `favicon.ico`, `videos/background.mp4` e `JoaoVictor_DesenvolvedorFrontEnd.pdf` (renomeado para `public/curriculo.pdf` como placeholder) todos em `public/`; caminhos referenciados em `src/` resolvem sem 404
  - Verify: `npm run build` e navegação manual pelos caminhos de mídia
  - Files: `public/*`

- [x] Task: Scaffold Next.js 15 (TS strict, Tailwind v4, ESLint, App Router)
  - Acceptance: `npm run dev` sobe; typecheck e lint passam
  - Verify: `npm run lint && npm run build`
  - Files: `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/*`

- [x] Task: Tokens de design em `globals.css` + fontes via `next/font`
  - Acceptance: CSS variables para light/dark definidas (ground/ink/accent/surface/border); fonte carregada sem render-blocking
  - Verify: build passa; variáveis visíveis no CSS compilado
  - Files: `src/styles/globals.css`, `src/app/layout.tsx`

- [x] Task: Tema dark/light sem flash (script inline + toggle persistido)
  - Acceptance: respeita `prefers-color-scheme`, persiste escolha, zero flash no reload
  - Verify: reload manual nos dois temas
  - Files: `src/app/layout.tsx`, `src/components/layout/ThemeToggle.tsx`

## Fase 2 — Dados e SEO

- [x] Task: `src/data/projects.ts` com projetos migrados do site antigo (schema full-stack)
  - Acceptance: todos os projetos atuais presentes, tipados, categoria `frontend`
  - Verify: `tsc --noEmit` sem erros
  - Files: `src/data/projects.ts`

- [x] Task: `src/data/social.ts` + copy revisada com narrativa full-stack
  - Acceptance: textos de hero/sobre aprováveis, título "Desenvolvedor Full-Stack"
  - Verify: revisão do usuário
  - Files: `src/data/social.ts`, textos nas seções

- [x] Task: Metadata/SEO completa (OG, favicon, description)
  - Acceptance: title/description full-stack, og tags, favicon migrado
  - Verify: view-source mostra tags
  - Files: `src/app/layout.tsx`, `public/`

- [x] Task: `src/data/stack.ts` — dados da Stack Técnica (inclui trilha Back-end & Infra)
  - Acceptance: 4 categorias tipadas (Linguagens & Core / Frameworks & Libs / Estilização & Design / Back-end & Infra em progresso)
  - Verify: `tsc --noEmit` sem erros
  - Files: `src/data/stack.ts`

## Fase 3 — Layout base

- [x] Task: Header com nav âncora + ThemeToggle
  - Acceptance: âncoras para inicio/sobre/stack/projetos/contato; foco visível; teclado ok
  - Verify: navegação por Tab manual
  - Files: `src/components/layout/Header.tsx`

- [x] Task: Footer + primitivos UI (Button, Section, Container, Tag)
  - Acceptance: componentes documentados por uso nas seções seguintes
  - Verify: lint + build
  - Files: `src/components/ui/*`, `src/components/layout/Footer.tsx`

- [x] Task: BrandIcons — SVGs inline de GitHub/LinkedIn/Instagram
  - Acceptance: lucide-react 1.58 removeu glyphs de marca; SVGs próprios com `currentColor`, `aria-hidden`
  - Verify: `tsc --noEmit` + lint limpos
  - Files: `src/components/ui/BrandIcons.tsx`

## Fase 4 — Seções (design via design-taste-frontend draw.mjs + frontend-design)

- [x] Task: Rodar `draw.mjs` e registrar direção de arte escolhida em `.taste-skill/`
  - Acceptance: direção escolhida justificada contra o inventário do sujeito
  - Verify: direction sheet salva
  - Note: direção **Experience** (split-stage, retrato fixo à esquerda, coluna de leitura à direita, cobalto `#2563eb` sobre Geist). Decidida contra o inventário: o sujeito é uma pessoa, então o retrato lidera; o clipe legado vira mídia da seção técnica.

- [x] Task: Hero (typewriter próprio, frases full-stack)
  - Acceptance: headline curta (≤2 linhas), typewriter com frases full-stack, mídia `background.webp`/`background.mp4` tratada com scrim, fallback sem JS
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; screenshots 1440/768/390 revisados
  - Files: `src/components/sections/Hero.tsx`, `src/hooks/useTypewriter.ts`

- [x] Task: Sobre (foto via `next/image`, bio revisada)
  - Acceptance: `img01.jpeg` otimizada, bio revisada com narrativa full-stack, alt text acessível
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; screenshots revisados
  - Files: `src/components/sections/About.tsx`

- [x] Task: Stack Técnica (inclui trilha back-end em progresso)
  - Acceptance: categorias Linguagens & Core / Frameworks & Libs / Estilização & Design / Back-end & Infra (em progresso), sem cards genéricos de ícones
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; screenshots revisados
  - Files: `src/components/sections/Stack.tsx`, `src/data/stack.ts`

- [x] Task: Projetos (grid, cards com tags de categoria)
  - Acceptance: grid de `projects.ts`, cards distintos por seção (sem grid de cards idênticos), tags de categoria, links repo/live
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; screenshots revisados
  - Files: `src/components/sections/Projects.tsx`, `src/components/ui/ProjectCard.tsx`

- [x] Task: Contato (RHF + zod + Web3Forms; loading/sucesso/erro; link `/curriculo.pdf`)
  - Acceptance: formulário validado por zod, estados loading/sucesso/erro, envio Web3Forms via env var, link para `/curriculo.pdf`
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; envio real testado; screenshots revisados
  - Files: `src/components/sections/Contact.tsx`, `src/lib/schemas.ts`

## Fase 5 — Motion e polish

- [x] Task: Animações de entrada por seção + assinatura de movimento (Motion)
  - Acceptance: entrance staggered (heading → texto → mídia, 60–90ms, subindo 16–32px), só transform/opacity, ≥8 elementos que movem no load/scroll
  - Verify: `inspect.mjs` sem FAIL de motion; zero jank percebido
  - Files: `src/components/ui/Reveal.tsx`, `src/components/sections/*`
  - Note: sem `framer-motion` — `Reveal` usa IntersectionObserver + CSS (`transition` em transform/opacity). Zero JS por frame, e o conteúdo fica visível sem script.

- [x] Task: `prefers-reduced-motion` respeitado em tudo
  - Acceptance: com reduced-motion ativo, conteúdo aparece estático sem travel; typewriter vira texto fixo
  - Verify: DevTools com reduced-motion; inspector + screenshots finais; critique.md (máx. 3 rodadas)
  - Files: `src/styles/globals.css`, `src/hooks/useTypewriter.ts`
  - Note: regra global `transition-duration: 0.01ms` (padrão canônico) em vez de `transition: none` — o navegador ainda dispara `transitionrun`, então a medição de motion continua fiel.

## Fase 6 — Qualidade e deploy

- [x] Task: Vitest + Testing Library + axe nos componentes interativos
  - Acceptance: Header, ThemeToggle, Contact form, useTypewriter testados; axe sem violações A/AA críticas
  - Verify: `npm run test` verde (32 testes após a Fase 7)
  - Files: `tests/*`, `vitest.config.ts`

- [x] Task: Lint/format/build limpos
  - Acceptance: zero erros de lint/typecheck; build de produção estático passando
  - Verify: `npm run lint && npm run format && npm run build`
  - Files: `eslint.config.mjs` (ignora `.taste-skill/`)

- [x] Task: Lighthouse local até Perf ≥ 95, A11y/BP/SEO = 100
  - Acceptance: LCP < 2.0s, CLS < 0.05, INP < 200ms; metas de A11y/BP/SEO batidas
  - Verify: relatório Lighthouse local anexado
  - Files: n/a (medição)
  - Note: Perf 100 / A11y 100 / BP 100 / SEO 100; LCP 1432–1545ms, CLS 0.0001, TBT 11–18ms (3 rodadas). Correções que sustentam o número: retrato 211→81 KB, screenshots 407→92 KB (PNG→WebP), clipe 807→89 KB (1080p→960x540/CRF29) e o hero fora do `Reveal` (não esconder o elemento LCP atrás de animação). O servidor de inspeção passou a comprimir com brotli e a servir `immutable` em `/_next/static`, como a Vercel — sem isso a medição local enxergava 475 KB de JS onde o usuário real vê ~150 KB.

- [x] Task: Deploy Vercel em `soudevictor.vercel.app`; remover `legacy/` após validação
  - Acceptance: site no ar, domínio apontando, formulário enviando em produção, `legacy/` removido do repo
  - Verify: produção navegável + form testado em produção
  - Files: `legacy/` (removido), config Vercel se necessário

## Fase 7 — Acabamentos (revisão de conformidade com a SPEC)

Auditoria de conformidade revelou déficits de acabamento. Base: `SPEC.md` (atualizada) + Boundaries.

- [x] Task: Nome acessível em todas as seções (landmarks rotuladas)
  - Acceptance: cada `<section>` tem `aria-labelledby` apontando para o id do seu título; teste garante o par id↔label
  - Verify: `npm run test` (novo teste de landmarks) + axe sem violações
  - Files: `src/components/sections/Hero.tsx`, `About.tsx`, `Stack.tsx`, `Projects.tsx`, `Contact.tsx`, `tests/a11y.test.tsx`
  - Note: `inicio-title` no h1 do Hero; as demais seções apontam para o h2 existente. +5 testes (`it.each`) verificam o par id↔label.

- [x] Task: Remover código morto e dependência não usada
  - Acceptance: `Section.tsx` removido (Hero não pode usá-lo); `Tag.tsx` passa a ser usado em Stack/Projetos; `motion` removido do `package.json` e do lockfile
  - Verify: `grep` sem referências órfãs; `npm run lint && npm run build`
  - Files: `src/components/ui/Section.tsx` (removido), `src/components/ui/Tag.tsx`, `src/components/sections/Stack.tsx`, `package.json`
  - Note: `Tag` ganhou a prop `raised` (fundo `--surface`) para viver sobre a seção em `--surface-2` (Projetos) sem sumir.

- [x] Task: Projetos — sem eyebrow, com tags de categoria e ordenação
  - Acceptance: o `kind` deixa de ficar acima do `<h3>`; `category` vira chip; `featured` ordena a lista; campo `logo` removido (sem consumidor)
  - Verify: `inspect.mjs` sem FAIL (eyebrows: 0); screenshots revisados
  - Files: `src/components/sections/Projects.tsx`, `src/data/projects.ts`, `public/images/thumbnails/*` (removidos)
  - Note: `inspect.mjs` → 0 FAIL / 0 WARN; screenshots confirmam o chip "Front-end" (acento) e o `kind` abaixo do título.

- [x] Task: Atualizar `SPEC.md` com as decisões (spec viva)
  - Acceptance: Motion→Reveal, modelo de `Project` (`screenshot`, sem `logo`), consumo de `category`/`featured`, primitivos UI, e Decisions log registrados
  - Verify: leitura do diff do `SPEC.md`
  - Files: `SPEC.md`

## Fase 8 — Acabamentos (logos, retrato e palco)

Segunda rodada, sobre mudanças do autor no diretório de trabalho (logos SVG, `img01.webp`, Instagram removido, `legacy/` apagado).

- [x] Task: Logo da marca por tema no Header e Footer
  - Acceptance: Header e Footer usam `Devictor_LogoPreta.svg` no claro e `Devictor_LogoBranca.svg` no escuro; nome acessível preservado
  - Verify: `inspect.mjs` (render escuro) + CSS compilado com `.dark\:block` / `.dark\:hidden:where(.dark,.dark *)`
  - Files: `src/components/layout/Header.tsx`, `Footer.tsx`, `src/styles/globals.css`
  - Note: Tailwind v4 por classe — `@custom-variant dark (&:where(.dark, .dark *))` liga `dark:` à classe `.dark`. Os dois SVGs ficam no DOM (um visível por tema); o nome acessível vive no `aria-label` do link.

- [x] Task: Retrato otimizado — `img01.jpeg` → `img01.webp`
  - Acceptance: nenhuma referência a `img01.jpeg`; metadata OG/Twitter com as dimensões reais (1024×1024)
  - Verify: `grep img01` sem `.jpeg`; build de metadata OK
  - Files: `src/app/layout.tsx`, `src/components/sections/Stage.tsx`
  - Note: `img01.jpeg` não existia no repo (imagem quebrada); o arquivo real é `public/images/img01.webp`.

- [x] Task: Palco estático — sem troca de mídia no scroll
  - Acceptance: o palco não alterna mais entre retrato, `background.mp4` e screenshots; uma única imagem fixa
  - Verify: `inspect.mjs` + leitura do código (sem IntersectionObserver no Stage)
  - Files: `src/components/sections/Stage.tsx`
  - Note: o Stage deixou de ser client component (−~8 kB de JS; First Load 150→149 kB). `background.mp4`/`background.webp` ficam sem uso, documentados como candidatos a mídia futura.

- [x] Task: Corrigir tipo após remoção do Instagram
  - Acceptance: build verde; `SocialLink.icon` alinhado aos ícones em uso
  - Verify: `npm run build`
  - Files: `src/data/social.ts`
  - Note: o autor removeu o Instagram do rodapé; a união ainda incluía `"instagram"`, quebrando `icons[link.icon]`. `InstagramIcon` segue em `BrandIcons.tsx`.

### Pendências de mídia (ideias — não bloqueiam código)

- `inspect.mjs` acusa `few-pictures` (3 imagens reais: retrato + 2 screenshots) e `no-footage`.
- Para limpar: mais screenshots reais por projeto (hero + detalhe) e/ou um clipe curto e honesto de um produto em uso (720p, mudo, ~1 MB, com poster). Ideias detalhadas no comentário de `Stage.tsx`.

## Fase 9 — Auditoria 2026-10-23 (front-end + dark-only)

- [x] Task: Remover todo o sistema de tema
  - Acceptance: sem `ThemeToggle`, `useTheme`, `tests/theme-toggle`, `localStorage`, `.dark`, tokens claros, `dark:` ou logo preta
  - Verify: `rg` sem referências; CSS compilado sem `.dark`; build verde
  - Files: `src/styles/globals.css`, `src/app/layout.tsx`, `Header.tsx`, `Footer.tsx`, arquivos removidos

- [x] Task: Reposicionar o site como front-end
  - Acceptance: cargo, bio, hero, contato, footer, keywords, Stack e metadata sem “full-stack/back-end”
  - Verify: `rg` nas fontes públicas; leitura da home
  - Files: `src/data/social.ts`, `src/data/stack.ts`, `src/app/layout.tsx`, `package.json`, `SPEC.md`, `AGENTS.md`

- [x] Task: Modelo de projeto e imagens
  - Acceptance: `Project` com `image { src, width, height, alt }`; sem `category`/`featured`; `alt` “Logomarca do …”; dimensões `1280×640`
  - Verify: `npx tsc --noEmit`; inspeção do DOM
  - Files: `src/data/projects.ts`, `src/components/sections/Projects.tsx`

- [x] Task: 404, sitemap, robots, JSON-LD e theme-color
  - Acceptance: `not-found.tsx` pt-BR com `noindex`; `sitemap.xml` e `robots.txt` no export; JSON-LD `Person` sem cargo inventado
  - Verify: `npm run build` + `out/404.html`, `out/sitemap.xml`, `out/robots.txt`
  - Files: `src/app/not-found.tsx`, `sitemap.ts`, `robots.ts`, `layout.tsx`

- [x] Task: Fallbacks sem JS e foco do contato
  - Acceptance: typewriter com primeira frase no HTML; menu mobile com fallback; formulário oculto sem JS + `mailto`; timeout/erro amigável; foco no sucesso e ao resetar
  - Verify: `npm test`; desabilitar JS no browser
  - Files: `useTypewriter.ts`, `Header.tsx`, `Contact.tsx`, `globals.css`

- [x] Task: Validação final
  - Acceptance: `npm run format`, `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build` verdes; revisão manual desktop/mobile
  - Verify: comandos + browser
  - Files: n/a
  - Note: 4 arquivos/32 testes; lint e typecheck limpos; export estático com `404.html`, `sitemap.xml` e `robots.txt`. No browser: desktop sem botão mobile; mobile 390 px sem overflow; menu abre/fecha com Escape e devolve o foco; sem JS o menu vira `details` fechado, o formulário some, o fallback `mailto` aparece e a primeira frase do typewriter está no HTML; 404 com um único `noindex` e links de volta para `/`.

- [x] Task: P2 visual/motion (aprovado pelo autor em 2026-10-23)
  - Acceptance: seção ativa no menu desktop, painel mobile com entrada/saída sutil e erros de contato com cor semântica
  - Verify: browser em desktop/mobile, validação vazia e falha de rede simulada
  - Files: `Header.tsx`, `useActiveSection.ts`, `Contact.tsx`, `globals.css`
  - Note: `useActiveSection` usa a posição real das seções (não a ordem do menu); o painel fica montado, mas `aria-hidden`/`inert` quando fechado. Erros usam `--danger`, `--danger-surface` e `--danger-border`.
