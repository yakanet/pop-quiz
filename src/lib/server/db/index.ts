import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const pg = postgres(env.DATABASE_URL);

export const db = drizzle(pg, {
	schema,
	casing: 'snake_case',
	logger: dev
});
