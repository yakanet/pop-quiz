import { env } from '$env/dynamic/private';
import postgres from 'postgres';
import { EventEmitter } from 'node:events';

if (!env.DATABASE_LISTEN_URL) throw new Error('DATABASE_URL is not set');

export const pg = postgres(env.DATABASE_LISTEN_URL, {
	idle_timeout: 0
});

export const stateChanged = new EventEmitter();
const listen = await pg.listen('quiz_changes', async (data) => {
	stateChanged.emit('quiz_changes', {
		id: JSON.parse(data).quiz_id
	});
});

process.on('SIGTERM', (_code) => {
	listen.unlisten()
})

process.on('SIGINT', (_code) => {
	listen.unlisten()
})