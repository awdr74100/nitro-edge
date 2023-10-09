import {
  drizzle as drizzlePostgresJS,
  type PostgresJsDatabase,
} from "drizzle-orm/postgres-js";
import {
  drizzle as drizzleNeonHTTP,
  type NeonHttpDatabase,
} from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import postgres from "postgres";
import * as schema from "../db/schema";

neonConfig.fetchConnectionCache = true;

let _db: PostgresJsDatabase<typeof schema> | NeonHttpDatabase<typeof schema>;

export const useDB = () => {
  const config = useRuntimeConfig();

  if (config.neonDatabaseUrl) {
    const client = neon(config.neonDatabaseUrl);
    _db = drizzleNeonHTTP(client, { schema });
  }

  if (config.localDatabaseUrl) {
    const client = postgres(config.localDatabaseUrl);
    _db = drizzlePostgresJS(client, { schema });
  }

  return _db;
  // if (!_db) {
  //   const queryClient = postgres(config.databaseUrl);
  //   _db = drizzle(queryClient, { schema });
  // }

  // return _db;
};
