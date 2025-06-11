export type QuizState =
	| { state: 'NOT_STARTED' }
	| { state: 'PENDING' }
	| { state: 'QUESTION', id: number }
	| { state: 'ANSWERED', id: number }
	| { state: 'FINISHED' }
	| { state: 'UNKNOWN', raw: string };