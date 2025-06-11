import { env } from '$env/dynamic/private';
import postgres from 'postgres';
import { EventEmitter } from 'node:events';
import type { QuizState } from '$lib/quiz.model';

if (!env.DATABASE_LISTEN_URL) throw new Error('DATABASE_URL is not set');

const pg = postgres(env.DATABASE_LISTEN_URL, {
  idle_timeout: 0,
});

/**
 * EventEmitter instance that signals when a quiz state change occurs.
 * Subscribers to this event will be notified whenever the state is updated.
 *
 * @type {EventEmitter}
 */
export const stateChanged: EventEmitter = new EventEmitter();

const listen = await pg.listen('quiz_changes', async (data) => {
  const json = JSON.parse(data);
  stateChanged.emit('quiz_changes', {
    id: json.quiz_pool_id,
    state: json.state,
  } satisfies QuizState);
});

['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, () => {
    stateChanged.removeAllListeners();
    listen.unlisten().then(() => process.exit(0));
  });
});
