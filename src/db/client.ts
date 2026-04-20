import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env, hasDatabase } from "@/lib/env";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

export function db(): NeonHttpDatabase<typeof schema> {
  if (!hasDatabase) {
    throw new Error("DATABASE_URL not configured");
  }
  if (!_db) {
    const sql = neon(env.DATABASE_URL!);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

export async function dbHealth(): Promise<"up" | "down"> {
  if (!hasDatabase) return "down";
  try {
    const sql = neon(env.DATABASE_URL!);
    await sql`SELECT 1`;
    return "up";
  } catch {
    return "down";
  }
}

export { schema };
