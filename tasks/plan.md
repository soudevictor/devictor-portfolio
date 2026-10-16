# Plano Técnico: Migração e Redesign do Portfólio Devictor

Spec de referência: `SPEC.md` (aprovada em 2026-10-16).

## Componentes principais e dependências

```
Fundação (scaffold, tokens, tema)
  └── Dados (projects.ts, social.ts, copy)
        └── Componentes UI primitivos (Button, Section, Container, Tag)
              └── Seções (Header/Hero/About/Stack/Projects/Contact/Footer)
                    └── Animações e interações (Motion, typewriter, tema)
                          └── Qualidade (testes, a11y, Lighthouse) → Deploy
```

Descoberta ao auditar o site antigo: existe uma seção **"Stack Técnica"** (Linguagens & Core / Frameworks & Libs / Estilização & Design) além das 4 seções da spec. Ela entra no redesign — é ótima para a narrativa full-stack. Assets a migrar: `assets/images` (background.webp, img01.jpeg, logos/, thumbnails/), `assets/videos/background.mp4` (loop de fundo, usado como mídia muted no hero ou fallback do background estático) e `favicon.ico`. **Currículo:** `assets/docs/JoaoVictor_DesenvolvedorFrontEnd.pdf` serve de placeholder em `public/curriculo.pdf` até o autor fornecer o novo PDF — o site sempre linka `/curriculo.pdf`, então a troca é só substituir o arquivo.

## Fases (ordem de implementação)

### Fase 1 — Fundação (scaffold)
- `create-next-app` (Next.js 15, App Router, TS strict, Tailwind v4, ESLint) na raiz do projeto, preservando `SPEC.md`, `tasks/` e o site antigo em `legacy/` (movido, não deletado, para referência até o deploy).
- Tokens de design em `globals.css` (CSS variables para light/dark), fontes via `next/font`.
- Checkpoint: `npm run dev` sobe, página em branco com tema alternando.

### Fase 2 — Dados e SEO
- `src/data/projects.ts` (migrar os projetos atuais do HTML antigo, categoria `frontend`), `social.ts`, textos revisados com narrativa full-stack.
- Metadata completa (title/description "Desenvolvedor Full-Stack", OpenGraph, favicon).
- Checkpoint: dados tipados compilam; metadata visível no view-source.

### Fase 3 — Layout e componentes base
- Header (nav âncora + ThemeToggle sem flash de tema), Footer, primitivos UI.
- Checkpoint: navegação por teclado funciona entre âncoras; toggle persiste.

### Fase 4 — Seções
- Hero (typewriter próprio com frases full-stack), Sobre (foto `img01.jpeg` otimizada via `next/image`), Stack Técnica (agora incluindo trilha back-end), Projetos (grid com cards + tags de categoria), Contato (React Hook Form + zod + Web3Forms, estados de loading/sucesso/erro, link `/curriculo.pdf`).
- Checkpoint: página completa navegável, visual final nos dois temas.

### Fase 5 — Motion e polish
- Animações de entrada por seção (Motion), micro-interações, respeito a `prefers-reduced-motion`.
- Checkpoint: animações suaves, zero jank, redução de movimento respeitada.

### Fase 6 — Qualidade e deploy
- Vitest + Testing Library + axe nos componentes interativos; lint/format; build estático.
- Lighthouse local até bater as metas (Perf ≥ 95, A11y/BP/SEO = 100).
- Deploy Vercel em `soudevictor.vercel.app`; remoção do `legacy/` após validação em produção.

## Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Flash de tema no load | Script inline no `<head>` lendo localStorage antes da hidratação |
| Copy full-stack parecer inflada sem projeto back-end | Texto focado em capacidade/direção; seção Stack já mostra trilha back-end em progresso |
| Web3Forms key vazar | Env var `NEXT_PUBLIC_WEB3FORMS_KEY` documentada, nunca commitada |
| Regressão de performance com Motion | Animar só transform/opacity; lazy nas seções abaixo da dobra |
| Perder conteúdo do site antigo | `legacy/` preservado até deploy validado |

## Paralelização

- Fase 2 (dados) pode ser escrita em paralelo com Fase 3 (componentes) — dados são apenas tipados.
- Fases 4–6 são sequenciais.

## Verificação entre fases

Cada fase termina com `npm run lint && npm run build` verde + checkpoint manual descrito acima. Fase 6 adiciona `npm run test` e Lighthouse.
