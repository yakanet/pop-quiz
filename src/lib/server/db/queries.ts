import { db } from '$lib/server/db/index';
import { eq, sql }                          from 'drizzle-orm';
import { quizItem, quizQuestion, quizState } from '$lib/server/db/schema';

/**
 * Retrieves a quiz pool from the database based on the provided pool ID.
 *
 * @constant queryState - A prepared query that, when executed with a provided pool ID, returns the corresponding quiz pool record from the database.
 */
export const queryState = db
  .select()
  .from(quizState)
  .prepare('queryState');

/**
 * Retrieves a single question along with its associated items based on the provided question ID.
 *
 * @constant queryQuestionWithItemsByQuestionId
 */
export const queryQuestionWithItemsByQuestionId = db
  .select({
    questions: quizQuestion,
    items: quizItem,
  })
  .from(quizQuestion)
  .leftJoin(quizItem, eq(quizQuestion.id, quizItem.quizId))
  .where(eq(quizQuestion.id, sql.placeholder('questionId')))
  .orderBy(quizItem.id)
  .prepare('queryQuestionWithItemsByQuestionId');


/**
 * A prepared database query to retrieve quiz questions along with their associated items
 * for a specific quiz pool identified by its ID.
 *
 * @constant queryQuestionsWithItemsByPoolId
 */
export const queryQuestionsWithItemsByPoolId = db
  .select({
    questions: quizQuestion,
    items: quizItem,
  })
  .from(quizQuestion)
  .leftJoin(quizItem, eq(quizQuestion.id, quizItem.quizId))
  .orderBy(quizQuestion.id, quizItem.id)
  .prepare('queryQuestionsWithItemsByPoolId');

/**
 * A prepared database query for deleting a quiz question by its unique identifier.
 *
 * @constant deleteQuestionWithQuestionId
 */
export const deleteQuestionWithQuestionId = db
  .delete(quizQuestion)
  .where(eq(quizQuestion.id, sql.placeholder('questionId')))
  .prepare('deleteQuestionWithQuestionId');
