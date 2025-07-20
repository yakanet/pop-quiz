import { getQuestionWithItemsByQuestionId } from '$lib/quiz.service';

export async function load({ params }) {
  const question = await getQuestionWithItemsByQuestionId(Number(params.question_id));
  return {
    question,
  };
}

export const actions = {};
