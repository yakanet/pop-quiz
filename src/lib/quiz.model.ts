export type QuizState =
	| { state: 'PENDING' }
	| { state: 'QUESTION', id: string }
	| { state: 'UNKNOWN', raw: string };