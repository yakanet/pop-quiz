import { db } from '$lib/server/db';
import { quizPool } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';
import { parseState } from '$lib/state';
import { getQuestionWithItemsByPoolId } from '$lib/quiz.service';

export async function load({ params }) {
  const [pool] = await db
    .select()
    .from(quizPool)
    .where(eq(quizPool.id, Number(params.pool_id)));
  if (!pool) {
    error(404, 'Not found');
  }
  const state = parseState(pool.state);
  const questions = await getQuestionWithItemsByPoolId(pool.id);
  return {
    pool,
    state,
    questions,
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
