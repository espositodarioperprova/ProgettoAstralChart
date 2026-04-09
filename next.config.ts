import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployments.
  // This bundles everything into a self-contained folder with a minimal server.js.
  // On Vercel, this setting is ignored (Vercel handles it natively).
  output: "standalone",

  // Allow the network IP to access dev resources (HMR, client JS).
  // Without this, accessing via LAN IP blocks client hydration
  // and all "use client" components stay invisible.
  allowedDevOrigins: ["http://192.168.1.6:3000"],
};

export default nextConfig;
