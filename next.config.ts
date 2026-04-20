import type { NextConfig } from "next";

const cspDirectives: string[] = [
  "default-src 'self'",
  // React Compiler + Next 16 production does not require 'unsafe-eval'.
  // 'unsafe-inline' is kept for Next's inline hydration scripts until nonces
  // are wired through the streaming renderer.
  "script-src 'self' 'unsafe-inline' https://platform.twitter.com https://cdn.syndication.twimg.com https://*.vercel-insights.com https://*.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://platform.twitter.com",
  "img-src 'self' data: blob: https://pbs.twimg.com https://abs.twimg.com https://img.youtube.com https://platform.twitter.com https://syndication.twitter.com",
  "font-src 'self' https://fonts.gstatic.com",
  "frame-src https://platform.twitter.com https://syndication.twitter.com https://www.youtube.com https://www.youtube-nocookie.com",
  "connect-src 'self' https://api.twitter.com https://platform.twitter.com https://syndication.twitter.com https://vitals.vercel-insights.com https://*.ingest.sentry.io https://*.ingest.us.sentry.io https://*.ingest.de.sentry.io",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_SENTRY_DSN: process.env.SENTRY_DSN || "",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: cspDirectives.join("; "),
          },
        ],
      },
      {
        source: "/api/health",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
};

export default nextConfig;
