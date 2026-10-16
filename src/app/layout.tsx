import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { site } from "@/data/social";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "desenvolvedor full-stack",
    "full-stack",
    "react",
    "next.js",
    "typescript",
    "joão victor carvalho",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.shortName,
    title: site.name,
    description: site.description,
    images: [
      {
        url: "/images/img01.jpeg",
        width: 512,
        height: 512,
        alt: `${site.name}, Desenvolvedor Full-Stack`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: site.description,
    images: ["/images/img01.jpeg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* Script síncrono no <head>: aplica a classe `.dark` antes da hidratação,
   lendo a escolha persistida ou o `prefers-color-scheme`. Sem flash. */
const themeScript = `(function(){try{document.documentElement.classList.add("js");var s=localStorage.getItem("theme");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=s?s==="dark":m;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={GeistSans.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-[var(--ground)] text-[var(--ink)] antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--accent-fill)] focus:px-4 focus:py-2 focus:text-[var(--accent-contrast)]"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <ThemeToggle />
      </body>
    </html>
  );
}
