import type { NextConfig } from "next";

/**
 * Export statique : la landing est servie par n'importe quel CDN / Nginx,
 * et les données dynamiques (stats, recherche) viennent de l'API Django côté client.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
