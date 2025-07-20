import { db } from '$lib/server/db';
import { type Question, type QuestionItem, quizItem, quizQuestion } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getQuestionWithItemsByQuestionId(id: number) {
  if (!id) {
    return null;
  }
  const questions = await db
    .select({
      questions: quizQuestion,
      items: quizItem,
    })
    .from(quizQuestion)
    .leftJoin(quizItem, eq(quizQuestion.id, quizItem.quizId))
    .where(eq(quizQuestion.id, id))
    .orderBy(quizItem.id);
  if (!questions.length) {
    return null;
  }
  const question: Question & { items: QuestionItem[] } = { ...questions[0].questions, items: [] };
  for (const { items: item } of questions) {
    if (item) {
      question.items.push(item);
    }
  }
  return question;
}

export async function getQuestionWithItemsByPoolId(id: number) {
  if (!id) {
    return [];
  }
  const questions = await db
    .select({
      questions: quizQuestion,
      items: quizItem,
    })
    .from(quizQuestion)
    .leftJoin(quizItem, eq(quizQuestion.id, quizItem.quizId))
    .where(eq(quizQuestion.quizPollId, id))
    .orderBy(quizQuestion.id, quizItem.id);
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
