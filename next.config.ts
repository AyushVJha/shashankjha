import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://platform.twitter.com https://cdn.syndication.twimg.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://platform.twitter.com",
              "img-src 'self' data: blob: https://pbs.twimg.com https://abs.twimg.com https://img.youtube.com https://platform.twitter.com https://syndication.twitter.com",
              "font-src 'self' https://fonts.gstatic.com",
              "frame-src https://platform.twitter.com https://syndication.twitter.com https://www.youtube.com",
              "connect-src 'self' https://api.twitter.com https://platform.twitter.com https://syndication.twitter.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
