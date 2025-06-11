// src/routes/custom-event/+server.js
import { produce } from 'sveltekit-sse';
import { db, pg } from '$lib/server/db';
import { quizPool, quizState } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export function POST() {
	return produce(async ({ emit }) => {
		console.log('started');
		const listen = await pg.listen('quiz_changes', async (data) => {
			console.log('table changed', data);
			const [pool] = await db.select().from(quizPool)
				.leftJoin(quizState, eq(quizState.quizPoolId, quizPool.id))
				.where(eq(quizPool.id, 1));

			const { error } = emit('message', JSON.stringify({state: pool.quiz_state?.state}));
			if (error) {
				return;
			}
		});
		console.log(listen);
		return () => {
			console.log('stoped');
			listen.unlisten();
		};
	});
}