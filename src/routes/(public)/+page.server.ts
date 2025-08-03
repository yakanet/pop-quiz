import { quizAnswer } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import { getCurrentQuestion } from '$lib/quiz.service';

export async function load({ parent }) {
  const { anonymousUserId } = await parent();
  return await getCurrentQuestion(anonymousUserId);
}

export const actions = {
  answer: async ({ request, cookies }) => {
    const form = await request.formData();
    const itemId = Number(form.get('item_id'));
    if (isNaN(itemId)) {
      return fail(415, { message: 'Invalid item id' });
    }
    const anonymousUserId = cookies.get('popquiz');
    if (!anonymousUserId) {
      return fail(401, { message: 'Unauthorized' });
    }
    const { question, state } = await getCurrentQuestion(anonymousUserId);
    if (state.state !== 'QUESTION') {
      return fail(400, { message: 'Question is not open anymore' });
    }
    if (!question) {
      return fail(404, { message: 'Question not found or out of state' });
    }

    if (question.items.find((item) => item.id === itemId) === undefined) {
      return fail(400, { message: 'Invalid item id' });
    }
    await db.insert(quizAnswer).values({
      userId: anonymousUserId,
      quizItemId: question.id,
      answer: String(itemId), // FIXME how to store data ?
    });
  },
};
