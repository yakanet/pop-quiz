import { produce } from 'sveltekit-sse';
import { stateChanged } from '$lib/server/db/pool';
import type { QuizState } from '$lib/quiz.model';

export function POST() {
	return produce(async ({ emit }) => {
		const onChange = async (event: QuizState) => {
			const { error } = emit('message', JSON.stringify(event));
			if (error) {
				console.error(error)
				return;
			}
		};
		stateChanged.on('quiz_changes', onChange);
		return () => {
			stateChanged.removeListener('quiz_changes', onChange);
		};
	});
}