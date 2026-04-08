import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployments.
  // This bundles everything into a self-contained folder with a minimal server.js.
  // On Vercel, this setting is ignored (Vercel handles it natively).
  output: "standalone",
};

export default nextConfig;
