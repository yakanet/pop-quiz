import { db } from '$lib/server/db';
import { quizAnswer, quizState, quizUser } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { nextStep, parseState } from '$lib/state';
import { findAllQuestions, getCurrentRawState } from '$lib/quiz.service';

export async function load() {
  const state = parseState(await getCurrentRawState());
  const questions = await findAllQuestions();
  const nextState = nextStep(state, questions);
  return {
    state,
    nextState,
    questions,
  };
}

export const actions = {
  state: async ({ request }) => {
    const form = await request.formData();
    const rawState = form.get('state')?.toString() ?? '';
    const state = parseState(rawState);
    if (state.state === 'UNKNOWN') {
      fail(400, {
        message: 'Unknown state',
      });
    }
    await db.update(quizState).set({ state: rawState });

    if (state.state === 'NOT_STARTED') {
      await db.delete(quizAnswer);
      await db.delete(quizUser);
    }
  },
};
