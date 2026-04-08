import "dotenv/config";
import { defineConfig } from "prisma/config";

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
