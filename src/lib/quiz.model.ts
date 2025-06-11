export type QuizState =
	| { state: 'NOT_STARTED' }
	| { state: 'PENDING' }
	| { state: 'QUESTION', id: string }
	| { state: 'ANSWERED', id: string }
	| { state: 'FINISHED' }
	| { state: 'UNKNOWN', raw: string };