import { db } from '$lib/server/db';
import { quizAnswer, quizUser } from '$lib/server/db/schema';
import { getCurrentQuestion } from '$lib/quiz.service';
import { eq } from 'drizzle-orm';

export async function load() {
  const {state, question} = await getCurrentQuestion(1);
  const stats = {
    state,
    voting: question ? await db.$count(quizAnswer, eq(quizAnswer.quizItemId, question.id)) : undefined,
    total: await db.$count(quizUser),
  };
  return {
    stats,
  };
}
