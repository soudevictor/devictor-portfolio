# Devictor — Portfólio Front-End

Portfólio pessoal de **João Victor Carvalho**, desenvolvedor front-end. Uma página única, dark-only, construída para apresentar projetos, stack e contato com foco em clareza, acessibilidade e performance.

[Repositório](https://github.com/soudevictor/devictor-portfolio) · [GitHub](https://github.com/soudevictor) · [LinkedIn](https://www.linkedin.com/in/soudevictor) · [E-mail](mailto:trabalho.joaovictor2004@gmail.com)

**Versão:** 2.1.0

**Deploy:** Vercel, com export estático. Site no ar em `https://soudevictor.vercel.app`.

## Sobre o projeto

O site combina uma coluna fixa com retrato e uma coluna de leitura que percorre **Hero → Sobre → Stack → Contato**; a seção de projetos ocupa a largura total abaixo. No mobile, o palco vira uma faixa no topo e o conteúdo flui em uma composição própria.

O projeto não tem backend: a página é exportada como HTML/CSS/JS estático. O formulário de contato envia diretamente do navegador para o Web3Forms, com validação local, estados de envio/sucesso/erro e fallback por `mailto` quando o JavaScript está desativado.

O posicionamento público é **Desenvolvedor Front-End**. A stack apresentada no site também inclui Angular (Signals), RxJS e `@ngrx/signals`; o site em si é construído com Next.js e React.

## Stack

| Área       | Tecnologias                                          |
| ---------- | ---------------------------------------------------- |
| Base       | Next.js 15 (App Router), React 19, TypeScript strict |
| Estilo     | Tailwind CSS v4, tokens CSS, fonte Geist             |
| Formulário | React Hook Form, Zod, Web3Forms                      |
| Ícones     | Lucide React e SVGs próprios                         |
| Testes     | Vitest, Testing Library, axe-core, jsdom             |
| Qualidade  | ESLint, Prettier, `tsc --noEmit`                     |

## Como rodar

Requisitos: **Node.js 20+** e **npm**.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

### Variável de ambiente

Crie um `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=sua_chave_do_web3forms
```

Sem a chave, o restante do site funciona, mas o formulário exibe um erro amigável e orienta o contato por e-mail. A chave é lida no cliente por usar o prefixo `NEXT_PUBLIC_`; não coloque segredos de servidor nela. O `.env.local` é ignorado pelo Git e não deve ser commitado.

## Scripts

| Comando              | O que faz                                                      |
| -------------------- | -------------------------------------------------------------- |
| `npm run dev`        | Inicia o servidor de desenvolvimento em `localhost:3000`       |
| `npm run build`      | Gera o export estático em `out/`; também roda lint e typecheck |
| `npm run lint`       | Executa o ESLint                                               |
| `npm run format`     | Formata o projeto com Prettier e ordena classes do Tailwind    |
| `npm test`           | Roda os 32 testes em 4 arquivos                                |
| `npm run test:watch` | Roda os testes em modo watch                                   |
| `npx tsc --noEmit`   | Verifica os tipos sem gerar arquivos                           |

Para rodar um único arquivo ou teste:

```bash
npx vitest run tests/contact.test.tsx
npx vitest run -t "envia payload válido"
```

## Estrutura

```text
.
├── public/
│   ├── curriculo.pdf
│   └── images/
│       ├── img01.webp
│       └── work/                 # logomarcas dos projetos
├── src/
│   ├── app/
│   │   ├── layout.tsx            # metadata, JSON-LD, Header/Footer
│   │   ├── page.tsx              # composição da home
│   │   ├── not-found.tsx         # 404 estático
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/               # Header, Footer
│   │   ├── sections/             # Hero, About, Stack, Projects, Stage, Contact
│   │   └── ui/                   # Button, Container, Reveal, Tag, ícones
│   ├── data/                     # social, projects, stack
│   ├── hooks/                    # typewriter, seção ativa, reduced motion
│   ├── lib/schemas.ts            # validação zod do contato
│   └── styles/globals.css        # tokens e regras globais
├── tests/                        # Vitest + Testing Library + axe
├── tasks/                        # planejamento e status
├── SPEC.md                       # spec viva e decisões
└── AGENTS.md                     # convenções para quem edita o projeto
```

## Onde editar

| Conteúdo                                      | Arquivo                  |
| --------------------------------------------- | ------------------------ |
| Identidade, links, navegação, copy e métricas | `src/data/social.ts`     |
| Projetos                                      | `src/data/projects.ts`   |
| Stack técnica                                 | `src/data/stack.ts`      |
| Tokens de cor, espaçamento e movimento        | `src/styles/globals.css` |
| Validação do formulário                       | `src/lib/schemas.ts`     |
| SEO, Open Graph e JSON-LD                     | `src/app/layout.tsx`     |

Para adicionar um projeto, inclua uma entrada em `src/data/projects.ts` com `title`, `subtitle`, `description`, `kind`, `stack` e `image` (`src`, `width`, `height`, `alt`). As imagens atuais são logomarcas; o `alt` deve dizer isso, por exemplo: `Logomarca do Nome do Projeto`.

## Contato

O formulário envia um `POST` direto para `https://api.web3forms.com/submit`, sem API route ou server action. Os campos são validados com Zod, o envio tem timeout de 10 segundos e os estados de erro são anunciados com `role="alert"`. Após o sucesso, o foco vai para a confirmação; ao iniciar uma nova mensagem, volta ao primeiro campo.

Sem JavaScript, o formulário é ocultado pelo contrato da classe `.js` e um fallback com link `mailto:` aparece. O e-mail canônico é **trabalho.joaovictor2004@gmail.com**.

## Acessibilidade

- Link “Pular para o conteúdo” e foco visível nos elementos interativos.
- Cada `<section>` tem `aria-labelledby` apontando para o título correspondente.
- O menu mobile fecha com `Escape`, devolve o foco ao botão e usa `aria-hidden`/`inert` quando fechado.
- O conteúdo permanece visível sem JavaScript; a primeira frase do typewriter já está no HTML.
- As animações usam apenas `transform` e `opacity`, com respeito a `prefers-reduced-motion`.
- Os testes com axe cobrem Header, Hero, About, Stack, Projects e Contact, incluindo o formulário com erros visíveis.

O contraste de cores não é medido pelo axe no jsdom, pois o ambiente não calcula layout nem cores; essa verificação é feita visualmente no navegador. Essa limitação é intencional e está documentada nos testes.

## SEO e export estático

A aplicação usa `output: "export"` no `next.config.ts` e gera `out/` no build. Metadata, Open Graph, Twitter Card, JSON-LD de `Person`, `sitemap.xml`, `robots.txt` e uma página 404 estática completam a superfície pública.

Por ser um export estático, o projeto não deve receber API routes, server actions, middleware, redirects/headers ou qualquer recurso que dependa de servidor. O `images.unoptimized: true` também é obrigatório: sem ele, o Next emite URLs de `/_next/image` que não existem no deploy estático.

Para conferir o resultado localmente:

```bash
npm run build
npx serve out
```

## Qualidade

Antes de considerar uma alteração concluída, rode:

```bash
npm run build
npm test
```

O projeto não tem CI configurada. Lint, typecheck, testes e build devem passar localmente. O `npm test` cobre validação do formulário, envio, estados de erro, menu/header, typewriter e acessibilidade.

## Documentação

- `SPEC.md` — spec viva, escopo e registro de decisões.
- `AGENTS.md` — convenções de arquitetura, estilo e armadilhas do projeto.
- `tasks/todo.md` — fases e status das tarefas.

## Licença

O código está sob a licença ISC declarada em `package.json` e no arquivo `LICENSE`. Textos, retrato, currículo e logomarcas de terceiros não estão incluídos nessa licença e não devem ser reutilizados sem autorização.

## Autor

**João Victor Carvalho** — Desenvolvedor Front-End

- GitHub: [@soudevictor](https://github.com/soudevictor)
- LinkedIn: [in/soudevictor](https://www.linkedin.com/in/soudevictor)
- E-mail: [trabalho.joaovictor2004@gmail.com](mailto:trabalho.joaovictor2004@gmail.com)
