// src/routes/custom-event/+server.js
import { produce } from 'sveltekit-sse';
import type { QuizState } from '$lib/quiz.model';

/**
 * @param {number} milliseconds
 * @returns
 */
function delay(milliseconds: number) {
	return new Promise(function run(resolve) {
		setTimeout(resolve, milliseconds);
	});
}

export function POST() {
	return produce(async ({ emit }) => {
		console.log('started')
		while (true) {
			console.log('loop');
			if (Math.random() > 0.5) {
				const { error } = emit('message', JSON.stringify({ state: 'PENDING' } satisfies QuizState));
				if (error) {
					return;
				}
			} else {
				const { error } = emit('message', JSON.stringify({ state: 'QUESTION', id: '1' } satisfies QuizState));
				if (error) {
					return;
				}
			}
			await delay(2_000);
		}
	}, {
		ping: 60_000,
		stop: () => {
			console.log('stoped');
		}
	});
}