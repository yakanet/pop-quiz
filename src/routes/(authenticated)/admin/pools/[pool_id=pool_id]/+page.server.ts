import { db } from '$lib/server/db';
import { quizQuestion } from '$lib/server/db/schema';
import { error, fail, redirect } from '@sveltejs/kit';
import { parseState } from '$lib/state';
import { getQuestionsWithItemsByPoolId } from '$lib/quiz.service';
import { deleteQuestionWithQuestionId, queryPoolFromPoolId } from '$lib/server/db/queries';

export async function load({ params }) {
  const [pool] = await queryPoolFromPoolId.execute({
    poolId: Number(params.pool_id),
  });
  if (!pool) {
    error(404, 'Not found');
  }
  const state = parseState(pool.state);
  const questions = await getQuestionsWithItemsByPoolId(pool.id);
  return {
    pool,
    state,
    questions,
  };
}

export const actions = {
  add: async () => {
    const [newQuestion] = await db
      .insert(quizQuestion)
      .values({
        quizPollId: 1,
        questionType: 'SINGLE',
        question: 'New question',
      })
      .returning();
    redirect(303, `/admin/pools/1/questions/${newQuestion.id}`);
  },
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id')?.toString());
    if (isNaN(id)) {
      return fail(400, { message: `Could not find any id to delete` });
    }
    await deleteQuestionWithQuestionId.execute({
      questionId: id,
    });
  },
};
