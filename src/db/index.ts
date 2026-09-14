import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb(env: any) {
  // If env.DB is not defined, we might be running in an environment without the binding.
  // We throw a clear error to help with debugging.
  if (!env || !env.DB) {
    throw new Error("Cloudflare D1 binding 'DB' is missing from the environment.");
  }
  return drizzle(env.DB, { schema });
}
