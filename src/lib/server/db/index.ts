import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const pg_pool = postgres(env.DATABASE_URL);

export const pg = postgres(env.DATABASE_LISTEN_URL, {
	idle_timeout: 0,
});

export const db = drizzle(pg_pool, { schema });
