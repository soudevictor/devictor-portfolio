# Tarefas: Migração e Redesign do Portfólio Devictor

Base: `SPEC.md` + `tasks/plan.md`. Ordem por dependência.

## Fase 1 — Fundação

- [ ] Task: Commitar estado final do site vanilla (últimas edições em index.html, _hero.scss, style.css)
  - Acceptance: working tree limpo antes do move para `legacy/`; histórico do site vanilla preservado no git
  - Verify: `git status` limpo; `git log` mostra o commit de fechamento
  - Files: `index.html`, `assets/javascript/index.js`, `assets/styles/css/style.css`, `assets/styles/sass/partials/_hero.scss`

- [ ] Task: Mover site antigo para `legacy/` (preservar até deploy)
  - Acceptance: `index.html`, `assets/`, configs antigas dentro de `legacy/`; raiz limpa para o scaffold; SPEC.md e tasks/ intactos
  - Verify: `ls` na raiz não mostra arquivos do site antigo
  - Files: `index.html`, `assets/`, `package.json` antigo

- [ ] Task: Migrar assets para `public/` (images, logos, thumbnails, favicon, vídeo, currículo)
  - Acceptance: `background.webp`, `img01.jpeg`, `logos/`, `thumbnails/`, `favicon.ico`, `videos/background.mp4` e `JoaoVictor_DesenvolvedorFrontEnd.pdf` (renomeado para `public/curriculo.pdf` como placeholder) todos em `public/`; caminhos referenciados em `src/` resolvem sem 404
  - Verify: `npm run build` e navegação manual pelos caminhos de mídia
  - Files: `public/*`

- [ ] Task: Scaffold Next.js 15 (TS strict, Tailwind v4, ESLint, App Router)
  - Acceptance: `npm run dev` sobe; typecheck e lint passam
  - Verify: `npm run lint && npm run build`
  - Files: `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/*`

- [ ] Task: Tokens de design em `globals.css` + fontes via `next/font`
  - Acceptance: CSS variables para light/dark definidas (ground/ink/accent/surface/border); fonte carregada sem render-blocking
  - Verify: build passa; variáveis visíveis no CSS compilado
  - Files: `src/styles/globals.css`, `src/app/layout.tsx`

- [ ] Task: Tema dark/light sem flash (script inline + toggle persistido)
  - Acceptance: respeita `prefers-color-scheme`, persiste escolha, zero flash no reload
  - Verify: reload manual nos dois temas
  - Files: `src/app/layout.tsx`, `src/components/layout/ThemeToggle.tsx`

## Fase 2 — Dados e SEO

- [ ] Task: `src/data/projects.ts` com projetos migrados do site antigo (schema full-stack)
  - Acceptance: todos os projetos atuais presentes, tipados, categoria `frontend`
  - Verify: `tsc --noEmit` sem erros
  - Files: `src/data/projects.ts`

- [ ] Task: `src/data/social.ts` + copy revisada com narrativa full-stack
  - Acceptance: textos de hero/sobre aprováveis, título "Desenvolvedor Full-Stack"
  - Verify: revisão do usuário
  - Files: `src/data/social.ts`, textos nas seções

- [ ] Task: Metadata/SEO completa (OG, favicon, description)
  - Acceptance: title/description full-stack, og tags, favicon migrado
  - Verify: view-source mostra tags
  - Files: `src/app/layout.tsx`, `public/`

## Fase 3 — Layout base

- [ ] Task: Header com nav âncora + ThemeToggle
  - Acceptance: âncoras para inicio/sobre/stack/projetos/contato; foco visível; teclado ok
  - Verify: navegação por Tab manual
  - Files: `src/components/layout/Header.tsx`

- [ ] Task: Footer + primitivos UI (Button, Section, Container, Tag)
  - Acceptance: componentes documentados por uso nas seções seguintes
  - Verify: lint + build
  - Files: `src/components/ui/*`, `src/components/layout/Footer.tsx`

## Fase 4 — Seções (design via design-taste-frontend draw.mjs + frontend-design)

- [ ] Task: Rodar `draw.mjs` e registrar direção de arte escolhida em `.taste-skill/`
  - Acceptance: direção escolhida justificada contra o inventário do sujeito
  - Verify: direction sheet salva

- [ ] Task: Hero (typewriter próprio, frases full-stack)
  - Acceptance: headline curta (≤2 linhas), typewriter com frases full-stack, mídia `background.webp`/`background.mp4` tratada com scrim, fallback sem JS
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; screenshots 1440/768/390 revisados
  - Files: `src/components/sections/Hero.tsx`, `src/hooks/useTypewriter.ts`

- [ ] Task: Sobre (foto via `next/image`, bio revisada)
  - Acceptance: `img01.jpeg` otimizada, bio revisada com narrativa full-stack, alt text acessível
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; screenshots revisados
  - Files: `src/components/sections/About.tsx`

- [ ] Task: Stack Técnica (inclui trilha back-end em progresso)
  - Acceptance: categorias Linguagens & Core / Frameworks & Libs / Estilização & Design / Back-end & Infra (em progresso), sem cards genéricos de ícones
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; screenshots revisados
  - Files: `src/components/sections/Stack.tsx`, `src/data/stack.ts`

- [ ] Task: Projetos (grid, cards com tags de categoria)
  - Acceptance: grid de `projects.ts`, cards distintos por seção (sem grid de cards idênticos), tags de categoria, links repo/live
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; screenshots revisados
  - Files: `src/components/sections/Projects.tsx`, `src/components/ui/ProjectCard.tsx`

- [ ] Task: Contato (RHF + zod + Web3Forms; loading/sucesso/erro; link `/curriculo.pdf`)
  - Acceptance: formulário validado por zod, estados loading/sucesso/erro, envio Web3Forms via env var, link para `/curriculo.pdf`
  - Verify: `lint.mjs` + `inspect.mjs` sem FAIL; envio real testado; screenshots revisados
  - Files: `src/components/sections/Contact.tsx`, `src/lib/schemas.ts`

## Fase 5 — Motion e polish

- [ ] Task: Animações de entrada por seção + assinatura de movimento (Motion)
  - Acceptance: entrance staggered (heading → texto → mídia, 60–90ms, subindo 16–32px), só transform/opacity, ≥8 elementos que movem no load/scroll
  - Verify: `inspect.mjs` sem FAIL de motion; zero jank percebido
  - Files: `src/components/sections/*`, `src/lib/motion.ts`

- [ ] Task: `prefers-reduced-motion` respeitado em tudo
  - Acceptance: com reduced-motion ativo, conteúdo aparece estático sem travel; typewriter vira texto fixo
  - Verify: DevTools com reduced-motion; inspector + screenshots finais; critique.md (máx. 3 rodadas)
  - Files: `src/lib/motion.ts`, `src/hooks/useTypewriter.ts`

## Fase 6 — Qualidade e deploy

- [ ] Task: Vitest + Testing Library + axe nos componentes interativos
  - Acceptance: Header, ThemeToggle, Contact form, useTypewriter testados; axe sem violações A/AA críticas
  - Verify: `npm run test` verde
  - Files: `tests/*`, `vitest.config.ts`

- [ ] Task: Lint/format/build limpos
  - Acceptance: zero erros de lint/typecheck; build de produção estático passando
  - Verify: `npm run lint && npm run format && npm run build`
  - Files: config lint/format se necessário

- [ ] Task: Lighthouse local até Perf ≥ 95, A11y/BP/SEO = 100
  - Acceptance: LCP < 2.0s, CLS < 0.05, INP < 200ms; metas de A11y/BP/SEO batidas
  - Verify: relatório Lighthouse local anexado
  - Files: n/a (medição)

- [ ] Task: Deploy Vercel em `soudevictor.vercel.app`; remover `legacy/` após validação
  - Acceptance: site no ar, domínio apontando, formulário enviando em produção, `legacy/` removido do repo
  - Verify: produção navegável + form testado em produção
  - Files: `legacy/` (removido), config Vercel se necessário
