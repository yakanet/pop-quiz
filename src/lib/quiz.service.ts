import { type Pool, type Question, type QuestionItem, quizAnswer } from '$lib/server/db/schema';
import {
  queryPoolFromPoolId,
  queryQuestionsWithItemsByPoolId,
  queryQuestionWithItemsByQuestionId,
} from '$lib/server/db/queries';
import { error } from '@sveltejs/kit';
import { parseState } from '$lib/state';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';

/**
 * Retrieves a question and its associated items by a given question ID.
 *
 * @param  id - The ID of the question to retrieve.
 * @return  A promise that resolves to a question with its associated items if found, otherwise null.
 */
export async function getQuestionWithItemsByQuestionId(id: number) {
  if (!id) {
    return null;
  }
  const questions = await queryQuestionWithItemsByQuestionId.execute({
    questionId: id,
  });
  if (!questions.length) {
    return null;
  }
  // Create single object query with attribute items
  const question: Question & { items: QuestionItem[] } = { ...questions[0].questions, items: [] };
  for (const { items: item } of questions) {
    if (item) {
      question.items.push(item);
    }
  }
  return question;
}

/**
 * Retrieves the current question for a given pool and anonymous user.
 *
 * @param poolId - The unique identifier of the pool to fetch the current question for.
 * @param anonymousUserId - The unique identifier of the anonymous user.
 * @return A promise that resolves to an object containing the current state, pool information, and the question details.
 */
export async function getCurrentQuestion(poolId: Pool['id'], anonymousUserId?: string) {
  const [pool] = await queryPoolFromPoolId.execute({
    poolId: Number(poolId),
  });
  if (!pool) {
    error(404, 'Not found');
  }
  let state = parseState(pool.state);

  // Create virtual status when question had been answered
  const currentQuestionId = state.state === 'QUESTION' ? state.id : 0;
  const question = await getQuestionWithItemsByQuestionId(currentQuestionId);

  if (state.state === 'QUESTION' && anonymousUserId) {
    const answerCount = await db.$count(
      quizAnswer,
      and(eq(quizAnswer.userId, anonymousUserId), eq(quizAnswer.quizItemId, currentQuestionId))
    );
    if (answerCount > 0) {
      state = { state: 'ANSWERED', id: state.id };
    }
  }
  pool.state = state.state;
  return { state, pool, question };
}

export async function getQuestionsWithItemsByPoolId(id: number) {
  if (!id) {
    return [];
  }
  const questions = await queryQuestionsWithItemsByPoolId.execute({
    poolId: id,
  });
  return [
    ...questions
      .reduce((map, question) => {
        let existingQuestion = map.get(question.questions.id);
        if (!existingQuestion) {
          existingQuestion = { ...question.questions, items: [] };
          map.set(question.questions.id, existingQuestion);
        }
        if (question.items) {
          existingQuestion.items.push(question.items);
        }
        return map;
      }, new Map<Question['id'], Question & { items: QuestionItem[] }>())
      .values(),
  ];
}
