import { db } from '$lib/server/db';
import { quizPool, quizQuestion } from '$lib/server/db/schema';
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
  add: async () => {
    await db.insert(quizQuestion).values({
      quizPollId: 1,
      questionType: 'SINGLE',
      question: 'New question',
    });
  },
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id')?.toString());
    if (isNaN(id)) {
      return fail(400, { message: `Could not find any id to delete` });
    }
    await db.delete(quizQuestion).where(eq(quizQuestion.id, Number(id)));
  },
};
