import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.NITRO_LOCAL_DATABASE_URL ??
      process.env.NITRO_NEON_DATABASE_URL,
  },
} satisfies Config;
