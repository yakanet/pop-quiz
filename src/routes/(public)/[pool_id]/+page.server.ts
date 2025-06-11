import { quizPool, quizQuestion } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { parseState } from '$lib/state';

export async function load() {
	const [pool] = await db.select().from(quizPool)
		.leftJoin(quizQuestion, eq(quizQuestion.quizPollId, quizPool.id))
		.where(eq(quizPool.id, 1));
	const state = parseState(pool.quiz_pool.state);
	return {
		state,
		...pool
	};
}