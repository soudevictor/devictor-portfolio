import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSG estático — portfólio não precisa de servidor.
  output: "export",
  reactStrictMode: true,
  images: {
    // Em `output: export` não há otimizador de imagem no servidor. Sem isto,
    // o Next emite URLs `/_next/image` que 404 num deploy estático. Com
    // `unoptimized`, as imagens vão pelo caminho direto em `/images`.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
