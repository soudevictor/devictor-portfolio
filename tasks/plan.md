# Plano Técnico: Portfólio Devictor

Spec de referência: `SPEC.md`. Este plano foi revisado em **2026-10-23** para refletir o posicionamento front-end e o tema dark-only; as fases 1–6 descrevem a construção já concluída, e a fase 7 registra a auditoria atual.

## Componentes principais e dependências

```
Fundação (scaffold, tokens dark-only, fontes)
  └── Dados (projects.ts, social.ts, stack.ts)
        └── Componentes UI primitivos (Button, Container, Tag)
              └── Seções (Header/Hero/About/Stack/Projects/Contact/Footer)
                    └── Interações (Reveal em CSS, typewriter, formulário)
                          └── Qualidade (testes, a11y, SEO, build estático)
```

A seção **Stack Técnica** faz parte do escopo desde o início. Hoje ela é front-end: linguagens/core, frameworks/libs e estilização/design. O estudo de back-end do autor não é anunciado no site. O currículo continua em `public/curriculo.pdf`; trocar o PDF não exige mudança de código.

## Fases

### Fase 1 — Fundação (concluída)

- Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4, ESLint, Vitest.
- Tokens em `src/styles/globals.css`; fontes via `next/font`.
- **Revisão 2026-10-23:** tokens passaram a ser dark-only; `color-scheme: dark` no `:root`; removidos tema claro, `.dark`, toggle e variantes `dark:`.

### Fase 2 — Dados e SEO (concluída)

- `src/data/projects.ts`, `social.ts`, `stack.ts` como fonte única de conteúdo.
- Metadata, OpenGraph/Twitter, JSON-LD `Person`, `sitemap.xml`, `robots.txt`, `theme-color`.
- **Revisão 2026-10-23:** posicionamento front-end; e-mail canônico Gmail; projetos com `image { src, width, height, alt }`; nada de `category`/`featured`.

### Fase 3 — Layout e componentes base (concluída)

- Header com navegação âncora, painel mobile e fallback sem JS; Footer; primitivos UI.
- **Revisão 2026-10-23:** logo branca fixa; botão de menu depende de `.js`; Escape e clique fora fecham o painel; o `ThemeToggle` foi removido.

### Fase 4 — Seções (concluída)

- Hero, Sobre, Stack Técnica, Projetos, Contato.
- **Revisão 2026-10-23:** copy front-end; Stack sem “Back-end & Infra”; Projetos sem filtros/categorias, com logomarcas e `alt` “Logomarca do …”; Contato com timeout, erros amigáveis e fallback `mailto` sem JS.

### Fase 5 — Motion e polish (concluída)

- `Reveal` em CSS + IntersectionObserver; micro-interações; `prefers-reduced-motion`.
- **Revisão 2026-10-23:** typewriter nasce com a primeira frase no HTML; fallback de impressão para o Reveal; Hero continua fora do Reveal por causa do LCP.

### Fase 6 — Qualidade e deploy (parcial)

- Vitest + Testing Library + axe; lint/format; build estático.
- Deploy em `soudevictor.vercel.app` ainda é uma etapa manual do autor.
- **Revisão 2026-10-23:** 4 arquivos/32 testes; `vitest-axe` removido por não ser usado; metadata do `package.json` atualizada.

### Fase 7 — Auditoria e correções (2026-10-23)

- P0/P1/P2 técnico: 404, SEO, no-JS, foco/erros do contato, CLS de imagens, remoção de resíduos de tema/full-stack.
- P2 visual/motion executado em 2026-10-23 com validação do autor: seção ativa no menu (desktop e mobile), transição simétrica do painel mobile com `aria-hidden`/`inert` e erros de contato em tokens semânticos (`--danger*`).
- Checkpoint: `npm run format`, `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`; validação manual no browser em desktop e mobile.

## Riscos e mitigações

| Risco                                 | Mitigação                                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Conteúdo sumir sem JS                 | Typewriter com texto inicial no HTML; menu/nav e contato com fallbacks; Reveal só oculta sob `.js` |
| Imagem de projeto com `alt` mentiroso | Hoje são logomarcas; `alt` e copy dizem “Logomarca”, não “Interface”                               |
| CLS por dimensões erradas             | `width`/`height` reais por projeto nos dados (`1280×640`)                                          |
| Erro de API cru na UI                 | Mensagem amigável; detalhe técnico só em `console.error`; timeout de 10 s                          |
| Chave Web3Forms vazar                 | `NEXT_PUBLIC_WEB3FORMS_KEY` só em `.env.local`; nunca commitar a chave                             |
| Regressão de performance              | Animar só transform/opacity; Hero fora do Reveal para não atrasar o LCP                            |
| Voltar tema claro por engano          | Não existe `.dark`, `dark:` nem persistência; tokens claros foram removidos                        |

## Verificação

Cada entrega termina com `npm run lint`, `npx tsc --noEmit`, `npm test` e `npm run build`. O deploy e a inspeção visual final são passos manuais do autor.
