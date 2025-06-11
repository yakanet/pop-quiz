import { quiz, quizPool, quizState } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export async function load() {
	const [pool] = await db.select().from(quizPool)
		.leftJoin(quizState, eq(quizState.quizPoolId, quizPool.id))
		.leftJoin(quiz, eq(quiz.quizPollId, quizPool.id))
		.where(eq(quizPool.id, 1));
	return {
		pool
	};
}