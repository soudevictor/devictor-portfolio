# Devictor Portfolio

Portfólio pessoal de João Victor Carvalho, com foco em apresentação profissional, visual responsivo e navegação direta em uma única página. O projeto é mantido de forma incremental, com base estática em HTML, CSS, Sass e JavaScript vanilla.

## Visão Geral

O site reúne as seções de início, sobre, projetos, habilidades e contato. A interface usa layout responsivo, tema claro/escuro, animações de entrada e componentes visuais pensados para destacar o conteúdo sem perder legibilidade.

## O Que Está Em Uso Hoje

- **HTML5 semântico** para estrutura da página.
- **CSS3 + Sass** para estilos modulares e manutenção centralizada em `assets/styles/sass`.
- **JavaScript vanilla** para interações da interface e comportamento da página.
- **GSAP + ScrollTrigger via CDN** para animações de entrada e scroll.
- **Typed.js via CDN** para o efeito de digitação da hero.
- **Font Awesome via CDN** para ícones da navegação, ações e seções.
- **Web3Forms** para envio do formulário de contato.
- **Google Fonts** para tipografia da interface.

## Funcionalidades

- Menu mobile com overlay e controle de acessibilidade.
- Hero com destaque visual, partículas decorativas e texto animado.
- Seção de projetos com cards e links externos.
- Seção de habilidades organizada em categorias.
- Formulário de contato com envio externo e modal de confirmação.

## Estrutura Atual

- `index.html`: página principal da aplicação.
- `assets/javascript/index.js`: interações e animações da interface.
- `assets/styles/sass/`: fonte Sass com variáveis, mixins, reset e parciais.
- `assets/styles/css/style.css`: CSS compilado para uso no site.
- `assets/images/`: imagens, logos e thumbnails dos projetos.
- `assets/docs/`: arquivos para download, como o currículo em PDF.

## Scripts

- `npm run sass`: compila o Sass em modo watch.
- `npm run sass:build`: gera o CSS final sem source map.
- `npm run build`: atalho para `npm run sass:build`.
