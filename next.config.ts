import { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,

  assetPrefix: isProd ? "https://auto-lap.online/" : "",

  async rewrites() {
    return [
      {
        source: "/api/external/:path*",
        destination: isProd
          ? "https://auto-lap.online/api/:path*"
          : "http://localhost:3000/api/:path*",
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
