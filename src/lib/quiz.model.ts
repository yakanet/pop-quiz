export type QuizState =
  | { state: 'NOT_STARTED' }
  | { state: 'PREPARE_QUESTION'; id: number }
  | { state: 'QUESTION'; id: number }
  | { state: 'ANSWERED'; id: number }
  | { state: 'CLOSED_QUESTION'; id: number }
  | { state: 'FINISHED' }
  | { state: 'UNKNOWN'; raw: string };
