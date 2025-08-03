import { quizAnswer } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { getCurrentQuestion } from '$lib/quiz.service';

export async function load({ parent }) {
  const { anonymousUserId } = await parent();
  return await getCurrentQuestion(anonymousUserId);
}

export const actions = {
  answer: async ({ request, cookies }) => {
    const form = await request.formData();
    const quizItemId = Number(form.get('item_id'));
    if (isNaN(quizItemId)) {
      return fail(415, { message: 'Invalid item id' });
    }
    const anonymousUserId = cookies.get('popquiz');
    if (!anonymousUserId) {
      return fail(401, { message: 'Unauthorized' });
    }
    const { question, state } = await getCurrentQuestion(anonymousUserId);
    if (state.state !== 'QUESTION') {
      return redirect(303, '/');
    }
    if (!question) {
      return redirect(303, '/');
    }

    if (!question.items.find((item) => item.id === quizItemId)) {
      return redirect(303, '/');
    }
    await db.insert(quizAnswer).values({
      userId: anonymousUserId,
      quizItemId: quizItemId,
      answer: String(quizItemId), // FIXME how to store data ?
    });
  },
};
