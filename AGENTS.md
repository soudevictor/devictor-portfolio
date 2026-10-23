# AGENTS.md

Personal portfolio (pt-BR) — a single-page **static** site built with Next.js 15 App Router, React 19, TypeScript strict, and Tailwind CSS v4. Dark-only. No backend. Public positioning: **Desenvolvedor Front-End**.

## Commands

```bash
npm run dev                     # http://localhost:3000
npm run build                   # static export to out/; also runs Next lint + typecheck
npm run lint                    # eslint .
npm run format                  # prettier --write (also sorts Tailwind classes)
npm test                        # vitest run (4 files, 32 tests, ~10s)
npm run test:watch
npx vitest run tests/contact.test.tsx   # one file
npx vitest run -t "envia payload válido" # one test by name
npx tsc --noEmit                # there is no typecheck script
```

Use npm only (`package-lock.json`). There is no CI; run `npm run build` and `npm test` before considering work done. Deploy target is Vercel static hosting.

## Where things live

- `src/app/page.tsx` — page composition: desktop has a sticky `Stage` column plus a scrolling reading column (Hero → About → Stack → Contact); `Projects` breaks out full-width below.
- `src/app/layout.tsx` — metadata/SEO, JSON-LD, the `.js` bootstrap script, Header/Footer. `not-found.tsx`, `sitemap.ts` and `robots.ts` complete the static surface.
- Header/Footer nav links use `/#secao` (not `#secao`) and the logo uses `/`, so they still work on `404.html`.
- `src/data/` — canonical content. `social.ts` holds identity, nav `sections`, all `copy`, and `stats`; also `projects.ts` and `stack.ts`. Edit these instead of hardcoding text in components.
- `src/components/{layout,sections,ui}`, `src/hooks/`, `src/lib/schemas.ts` (zod), `src/styles/globals.css` (design tokens).
- `tests/` — Vitest + Testing Library + axe. Only `tests/**/*.test.{ts,tsx}` are collected.
- `@/*` maps to `src/*` in both `tsconfig.json` and `vitest.config.ts`.

Adding a project is a `src/data/projects.ts` edit only; the UI consumes `title`, `subtitle`, `description`, `kind`, `stack`, `image.src`, `image.width`, `image.height`, and `image.alt`. The project images are logos today, so `alt` must say “Logomarca”, not “Interface”.

## Gotchas

**Static export constraints.** `next.config.ts` uses `output: "export"`. Do not add API routes, server actions, middleware, redirects/headers, or anything requiring a server. `images.unoptimized: true` is required for export — removing it emits `/_next/image` URLs that 404 on deploy. `next/image` still needs dimensions (`width`/`height` or `fill`).

**Generated files.** `out/`, `.next/`, `tsconfig.tsbuildinfo`, and `next-env.d.ts` are generated/gitignored; never edit them. `.taste-skill/` is scratch from design inspection (including `serve.cjs`, a static server for `out/`), not app source.

**Tailwind v4 / dark-only.** There is no `tailwind.config.*`; tokens live in `src/styles/globals.css` and components use classes like `bg-[var(--surface)]`. Add new colors as tokens in `:root`, not as hex literals. There is no `.dark`, no `dark:` variant, no toggle and no light theme. The root declares `color-scheme: dark`; the logo is always the white version.

**`.js` contract.** The inline script in `layout.tsx` adds `.js` before hydration. `Reveal` CSS hides `[data-reveal]` only under `.js`; the mobile menu button and the JS contact form are hidden without `.js`, and their no-JS fallbacks take over. Keep the script, the CSS and the fallbacks in sync. Content must stay visible without JS.

**Animation rules.** The Hero is intentionally outside `Reveal` because its heading is the LCP; do not hide above-the-fold/LCP content behind animation. Motion is CSS-only (transform/opacity), and the reduced-motion rule uses `0.01ms` durations deliberately, not `transition: none`. The mobile panel stays mounted for a symmetric fade/translate; when closed it is `aria-hidden` and `inert`. `useActiveSection` marks the current section from its real scroll position, not from the menu order.

**Accessibility is tested.** Every `<section>` needs `aria-labelledby` pointing at its heading id (`tests/a11y.test.tsx` enforces the pairs). Color-contrast is intentionally disabled in axe because jsdom cannot compute it; visual contrast is checked in a browser. Do not "fix" that config.

**Test environment.** `tests/setup.ts` stubs `IntersectionObserver` and `matchMedia`. The Vite warning about the config being loaded as CommonJS is expected (package is not `"type": "module"`); it is not a failure.

**Contact form.** It posts directly from the browser to Web3Forms using `NEXT_PUBLIC_WEB3FORMS_KEY` from `.env.local` (gitignored, never commit a key). Tests stub `fetch` and `NEXT_PUBLIC_WEB3FORMS_KEY`; without JS the form is hidden and a `mailto:` fallback appears. Errors are always friendly; raw JSON/API text stays in `console.error`.

**Language/style.** User-facing copy, ARIA labels, test descriptions, and code comments are pt-BR; keep that. Components are named exports in PascalCase, server components by default, with `"use client"` only for Header, Contact, Typewriter, Reveal, and hooks.

## Source of truth

`SPEC.md` is the living spec with a decisions log — read it before changing scope or design assumptions. `tasks/todo.md` tracks phase status (deploy is live at `soudevictor.vercel.app`); `tasks/plan.md` explains the original architecture phases.
