import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site static: se încarcă pe orice gazduire cPanel (Apache + PHP).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
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
