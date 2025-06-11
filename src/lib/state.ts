import type { QuizState } from '$lib/quiz.model';

export function parseState(state: string): QuizState {
	if (state === 'PENDING') {
		return { state: 'PENDING' };
	}
	if (state.startsWith('QUESTION_')) {
		const [_, id] = state.split('_');
		return { state: 'QUESTION', id: id };
	}
	return { state: 'UNKNOWN', raw: state };
}