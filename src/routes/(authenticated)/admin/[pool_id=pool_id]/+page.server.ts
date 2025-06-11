import { db } from '$lib/server/db';
import { quizPool, quizQuestion } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';
import { parseState } from '$lib/state';

export async function load({ params }) {
  const [pool] = await db
    .select()
    .from(quizPool)
    .leftJoin(quizQuestion, eq(quizQuestion.quizPollId, quizPool.id))
    .where(eq(quizPool.id, Number(params.pool_id)));
  if (!pool) {
    error(404, 'Not found');
  }
  const state = parseState(pool.quiz_pool.state);
  return {
    pool,
    state,
  };
}

export const actions = {
  state: async ({ request, params }) => {
    const form = await request.formData();
    const rawState = form.get('state')?.toString() ?? '';
    const state = parseState(rawState);
    if (state.state === 'UNKNOWN') {
      fail(400, {
        message: 'Unknown state',
      });
    }
    await db
      .update(quizPool)
      .set({
        state: rawState,
      })
      .where(eq(quizPool.id, Number(params.pool_id)));
  },
};
