import type { QuizState } from '$lib/quiz.model';

export function parseState(state: string): QuizState {
  switch (state) {
    case 'NOT_STARTED':
    case 'FINISHED':
      return { state };
    default:
      if (/^PREPARE_QUESTION_\d+$/.test(state)) {
        const [_, id] = state.split('_');
        return { state: 'QUESTION', id: Number(id) };
      }
      if (/^QUESTION_\d+$/.test(state)) {
        const [_, id] = state.split('_');
        return { state: 'QUESTION', id: Number(id) };
      }
      if (/^ANSWERED_\d+$/.test(state)) {
        const [_, id] = state.split('_');
        return { state: 'ANSWERED', id: Number(id) };
      }
      if (/^CLOSED_QUESTION_\d+$/.test(state)) {
        const [_, id] = state.split('_');
        return { state: 'CLOSED_QUESTION', id: Number(id) };
      }
      return { state: 'UNKNOWN', raw: state };
  }
}

export function stateToString(state: QuizState): string {
  // @formatter:off
  switch (state.state) {
    case 'NOT_STARTED':
      return 'NOT_STARTED';
    case 'FINISHED':
      return 'FINISHED';
    case 'PREPARE_QUESTION':
      return `PREPARE_QUESTION_${state.id}`;
    case 'QUESTION':
      return `QUESTION_${state.id}`;
    case 'ANSWERED':
      return `ANSWERED_${state.id}`;
    case 'CLOSED_QUESTION':
      return `CLOSED_QUESTION_${state.id}`;
    default:
      return 'UNKNOWN';
  }
  // @formatter:on
}
