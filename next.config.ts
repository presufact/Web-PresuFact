import type { NextConfig } from "next";

// presufact.es es el dominio principal: el resto redirige a él conservando la ruta.
const secondaryHosts = ["www.presufact.es", "presufact.cloud", "www.presufact.cloud"];

const nextConfig: NextConfig = {
  async redirects() {
    return secondaryHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://presufact.es/:path*",
      permanent: true,
    }));
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
