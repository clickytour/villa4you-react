import type { NextConfig } from "next";

const buildMarker = process.env.NEXT_PUBLIC_BUILD_MARKER
  || process.env.VERCEL_GIT_COMMIT_SHA
  || process.env.GIT_COMMIT_SHA
  || "dev-local";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_MARKER: buildMarker,
  },
  async redirects() {
    return [
      {
        source: "/agent-apply",
        destination: "/agents-apply",
        permanent: true,
      },
      {
        source: "/agents/apply",
        destination: "/agents-apply",
        permanent: true,
      },
      {
        source: "/servis-apply",
        destination: "/service-apply",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
