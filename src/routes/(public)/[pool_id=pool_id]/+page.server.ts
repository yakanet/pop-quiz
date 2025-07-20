import { quizAnswer, quizPool } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { parseState } from '$lib/state';
import { error } from '@sveltejs/kit';
import { getQuestionWithItemsByQuestionId } from '$lib/quiz.service';

export async function load({ params, parent }) {
  const [pool] = await db
    .select()
    .from(quizPool)
    .where(eq(quizPool.id, Number(params.pool_id)));

  if (!pool) {
    error(404, 'Not found');
  }
  let state = parseState(pool.state);

  // Create virtual status when question had been answered
  if (state.state === 'QUESTION') {
    const { anonymousUserId } = await parent();
    const answerCount = await db.$count(quizAnswer, eq(quizAnswer.userId, anonymousUserId));
    if (answerCount > 0) {
      state = { state: 'ANSWERED', id: state.id };
    }
  }

  const currentQuestionId = state.state === 'ANSWERED' || state.state === 'QUESTION' ? state.id : 0;
  const question = await getQuestionWithItemsByQuestionId(currentQuestionId);
  return {
    pool,
    state,
    question: question,
  };
}
