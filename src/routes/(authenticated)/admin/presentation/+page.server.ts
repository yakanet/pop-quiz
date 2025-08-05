import { db } from '$lib/server/db';
import { type QuestionItem, quizUser } from '$lib/server/db/schema';
import { getCurrentQuestion } from '$lib/quiz.service';
import { findAnswersForQuestionId } from '$lib/server/db/queries';

export async function load() {
  const { state, question } = await getCurrentQuestion();
  const answers = question
    ? await findAnswersForQuestionId.execute({ questionId: question.id })
    : [];
  const voting = new Set(answers.map((a) => a.userId));
  const votes = answers.reduce((acc, a) => {
    let existing = acc.get(a.quizItemId);
    if (!existing) {
      acc.set(a.quizItemId, {
        id: a.quizItemId,
        label: question!.items.find(item => item.id === a.quizItemId)!.title,
        count: (acc.get(a.quizItemId) ?? { count: 0 }).count + 1,
      })
    }
    else {
      existing.count += 1;
    }
    return acc;
  }, new Map<QuestionItem['id'], { id: number; label: string, count: number }>());

  const stats = {
    state,
    votes: (question?.items??[]).map(i => votes.get(i.id) ?? {
      id: i.id,
      label: i.title,
      count: 0,
    }),
    user_votes: voting.size,
    total_user: await db.$count(quizUser),
  };
  return {
    stats,
    question,
  };
}
