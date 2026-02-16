import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
