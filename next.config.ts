import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSG estático — portfólio não precisa de servidor.
  output: "export",
  reactStrictMode: true,
  images: {
    // Formatos modernos; o deploy é estático (Vercel).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
