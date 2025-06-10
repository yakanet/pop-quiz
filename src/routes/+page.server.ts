import type { QuizState } from '$lib/quiz.model';

export async function load() {
	return {
		state: 'PENDING'
	} as QuizState;
}