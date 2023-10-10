import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.NITRO_TURSO_DATABASE_URL,
    authToken: process.env.NITRO_TURSO_AUTH_TOKEN,
    // connectionString:
    //   process.env.NITRO_LOCAL_DATABASE_URL ??
    //   process.env.NITRO_NEON_DATABASE_URL ?? process.env.NITRO_TURSO_DATABASE_URL,
  },
} satisfies Config;
