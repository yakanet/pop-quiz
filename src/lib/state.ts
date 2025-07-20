import type { QuizState } from '$lib/quiz.model';
import type { Question } from './server/db/schema';

export function parseState(state: string): QuizState {
  switch (state) {
    case 'NOT_STARTED':
    case 'FINISHED':
      return { state };
    default:
      if (/^PREPARE_QUESTION#\d+$/.test(state)) {
        const [_, id] = state.split('#');
        return { state: 'PREPARE_QUESTION', id: Number(id) };
      }
      if (/^QUESTION#\d+$/.test(state)) {
        const [_, id] = state.split('#');
        return { state: 'QUESTION', id: Number(id) };
      }
      if (/^ANSWERED#\d+$/.test(state)) {
        const [_, id] = state.split('#');
        return { state: 'ANSWERED', id: Number(id) };
      }
      if (/^CLOSED_QUESTION#\d+$/.test(state)) {
        const [_, id] = state.split('#');
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
      return `PREPARE_QUESTION#${state.id}`;
    case 'QUESTION':
      return `QUESTION#${state.id}`;
    case 'ANSWERED':
      return `ANSWERED#${state.id}`;
    case 'CLOSED_QUESTION':
      return `CLOSED_QUESTION#${state.id}`;
    default:
      return 'UNKNOWN';
  }
  // @formatter:on
}

export function nextStep(state: QuizState, questions: Question[]): QuizState | null {
  const ids = questions.map((q) => q.id).sort((a, b) => a - b);
  switch (state.state) {
    case 'NOT_STARTED':
      return { state: 'PREPARE_QUESTION', id: ids[0] };
    case 'PREPARE_QUESTION':
      return { state: 'QUESTION', id: state.id };
    case 'QUESTION':
      return { state: 'CLOSED_QUESTION', id: state.id };
    case 'CLOSED_QUESTION':
      const currentIndex = ids.findIndex((id) => id === state.id);
      if (currentIndex === ids.length - 1) {
        return { state: 'FINISHED' };
      }
      return { state: 'PREPARE_QUESTION', id: ids[currentIndex + 1] };
    default:
      return null;
  }
}