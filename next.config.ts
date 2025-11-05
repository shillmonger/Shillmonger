import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ✅ Allow external image domains (for Next/Image)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
  },

  // ✅ Use Turbopack instead of Webpack
  turbopack: {
    resolveAlias: {
      "@": resolve(__dirname, "./"),
    },
  },

  // Turbopack is enabled via the --turbo flag in dev mode
  experimental: {},

  // Webpack configuration is not needed when using Turbopack
  webpack: null,
};

export default nextConfig;
