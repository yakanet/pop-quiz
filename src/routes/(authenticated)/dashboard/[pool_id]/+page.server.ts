import { db } from '$lib/server/db';
import { quizQuestion, quizPool } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const [pool] = await db.select()
		.from(quizPool)
		.leftJoin(quizQuestion, eq(quizQuestion.quizPollId, quizPool.id))
		.where(eq(quizPool.id, Number(params.pool_id)));
	if (!pool) {
		error(404, 'Not found');
	}
	return {
		pool
	};
}