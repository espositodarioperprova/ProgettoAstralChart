import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Load .env.local first (Next.js convention), fall back to .env
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    // Use process.env instead of env() so `prisma generate` works
    // even without DATABASE_URL set (e.g. in CI or on Vercel build).
    url: process.env.DATABASE_URL ?? "",
  },
});
