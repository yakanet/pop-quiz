// src/routes/custom-event/+server.js
import { produce } from 'sveltekit-sse';
import { db } from '$lib/server/db';
import { quizPool, quizState } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { stateChanged } from '$lib/server/db/pool';

export function POST() {
	return produce(async ({ emit }) => {
		const onChange = async (event: any) => {
			console.log({ event });
			const [pool] = await db.select().from(quizPool)
				.leftJoin(quizState, eq(quizState.quizPoolId, quizPool.id))
				.where(eq(quizPool.id, event.id));

			const { error } = emit('message', JSON.stringify({ state: pool.quiz_state?.state }));
			if (error) {
				return;
			}
		};
		stateChanged.on('quiz_changes', onChange);
		return () => {
			stateChanged.removeListener('quiz_changes', onChange);
		};
	});
}