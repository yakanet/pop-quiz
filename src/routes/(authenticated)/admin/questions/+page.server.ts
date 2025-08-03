import { db } from '$lib/server/db';
import { quizQuestion } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { parseState } from '$lib/state';
import { findAllQuestions, getCurrentRawState } from '$lib/quiz.service';
import { deleteQuestionWithQuestionId } from '$lib/server/db/queries';

export async function load({ params }) {
  const state = parseState(await getCurrentRawState());
  const questions = await findAllQuestions();
  return {
    state,
    questions,
  };
}

export const actions = {
  add: async () => {
    const [newQuestion] = await db
      .insert(quizQuestion)
      .values({
        questionType: 'SINGLE',
        question: 'New question',
      })
      .returning();
    redirect(303, `/admin/questions/${newQuestion.id}`);
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
