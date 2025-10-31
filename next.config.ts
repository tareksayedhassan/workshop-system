// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/external/:path*",
        destination: "http://auto-lap.online/api/:path*",
      },
    ];
  },
  staticPageGenerationTimeout: 180,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "auto-lap.online" },
      { protocol: "http", hostname: "localhost", port: "3000" },
    ],
  },
};

export default nextConfig;
