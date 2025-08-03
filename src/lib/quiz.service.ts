import { type Question, type QuestionItem }                                     from '$lib/server/db/schema';
import { queryQuestionsWithItemsByPoolId, queryQuestionWithItemsByQuestionId } from '$lib/server/db/queries';

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
