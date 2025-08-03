import { type Question, type QuestionItem, quizAnswer } from '$lib/server/db/schema';
import {
  queryState,
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
 * Fetches and returns the current raw state of the application by executing a query.
 * If no state is found, it triggers an error with a 404 status.
 *
 * @return A promise that resolves to the raw state value.
 */
export async function getCurrentRawState() {
  const [state] = await queryState.execute();
  if (!state) {
    error(404, 'Not found');
  }
  return state.state;
}

/**
 * Retrieves the current question for a given pool and anonymous user.
 *
 * @param anonymousUserId - The unique identifier of the anonymous user.
 * @return A promise that resolves to an object containing the current state, pool information, and the question details.
 */
export async function getCurrentQuestion(anonymousUserId?: string) {
  let state = parseState(await getCurrentRawState());

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
  return { state, question };
}

export async function findAllQuestions() {
  const questions = await queryQuestionsWithItemsByPoolId.execute();
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
