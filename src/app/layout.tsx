import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site, social } from "@/data/social";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  keywords: [
    "desenvolvedor front-end",
    "front-end",
    "react",
    "next.js",
    "angular",
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
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [
      {
        url: "/images/img01.webp",
        width: 1024,
        height: 1024,
        alt: `${site.name}, ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/images/img01.webp"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

/* Script síncrono no <head>: marca `.js` antes da hidratação. O CSS usa essa
   classe para o Reveal e para esconder os controles que dependem de JS. */
const jsScript = `(function(){try{document.documentElement.classList.add("js");}catch(e){}})();`;

/* JSON-LD: identidade e links públicos, sem cargo ou tecnologia inventada. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  jobTitle: site.role,
  description: site.description,
  email: site.email,
  sameAs: social.map((link) => link.href).filter((href) => href.startsWith("https://")),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-[var(--ground)] text-[var(--ink)] antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[var(--accent-fill)] focus:px-4 focus:py-2 focus:text-[var(--accent-contrast)]"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
