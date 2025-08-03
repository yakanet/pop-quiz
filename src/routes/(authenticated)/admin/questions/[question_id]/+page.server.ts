import { getQuestionWithItemsByQuestionId } from '$lib/quiz.service';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { quizItem, quizQuestion } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
  const question = await getQuestionWithItemsByQuestionId(Number(params.question_id));
  if (!question) {
    error(404, 'Not found');
  }
  return {
    question,
  };
}

export const actions = {
  default: async ({ request, params }) => {
    const form = await request.formData();
    const questionType = form.get('questionType')?.toString();
    const questionPrompt = form.get('question')?.toString();
    const question = await getQuestionWithItemsByQuestionId(Number(params.question_id));
    if (!question) {
      error(404, 'Not found');
    }
    await db
      .update(quizQuestion)
      .set({
        question: questionPrompt,
        questionType: questionType as any, // FIXME type
      })
      .where(eq(quizQuestion.id, question.id));

    // Manage items :
    // items[] => ADD
    // items[positive id] => UPDATE id
    // items[negative id] => DELETE id
    for (const [key, value] of form.entries()) {
      const match = /^items\[(?<delete>-?)(?<id>\d*)]$/.exec(key);
      if (!match || !match.groups) {
        continue;
      }
      const id = Number(match.groups['id']);
      const isDelete = match.groups['delete'] === '-';
      if (isDelete) {
        await db.delete(quizItem).where(eq(quizItem.id, Number(id)));
      } else if (!id) {
        await db.insert(quizItem).values({
          quizId: question.id,
          title: value.toString(),
        });
      } else {
        await db
          .update(quizItem)
          .set({
            title: value.toString(),
          })
          .where(eq(quizItem.id, Number(id)));
      }
    }
    redirect(303, '/admin/questions');
  },
};
