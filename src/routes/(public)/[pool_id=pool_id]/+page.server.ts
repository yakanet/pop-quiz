import { quizPool } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { parseState } from '$lib/state';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const [pool] = await db
    .select()
    .from(quizPool)
    .where(eq(quizPool.id, Number(params.pool_id)));

  if (!pool) {
    error(404, 'Not found');
  }
  const state = parseState(pool.state);
  return {
    pool,
    state,
  };
}
