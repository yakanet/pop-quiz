import type { QuizState } from '$lib/quiz.model';
import type { Question } from './server/db/schema';

/**
 * Parses the provided state string and returns a structured representation of the quiz state.
 *
 * @param {string} state - The state string to parse. It can represent various states such as NOT_STARTED, FINISHED, or
 * states with an identifier like PREPARE_QUESTION#1, QUESTION#2, ANSWERED#3, etc.
 * @return {QuizState} An object representing the parsed state information, including the state type and optional identifier.
 */
export function parseState(state: string): QuizState {
  switch (state) {
    case 'NOT_STARTED':
    case 'FINISHED':
      return { state };
    default:
      if (/^PREPARE_QUESTION#\d+$/.test(state)) {
        const [, id] = state.split('#');
        return { state: 'PREPARE_QUESTION', id: Number(id) };
      }
      if (/^QUESTION#\d+$/.test(state)) {
        const [, id] = state.split('#');
        return { state: 'QUESTION', id: Number(id) };
      }
      if (/^ANSWERED#\d+$/.test(state)) {
        const [, id] = state.split('#');
        return { state: 'ANSWERED', id: Number(id) };
      }
      if (/^CLOSED_QUESTION#\d+$/.test(state)) {
        const [, id] = state.split('#');
        return { state: 'CLOSED_QUESTION', id: Number(id) };
      }
      return { state: 'UNKNOWN', raw: state };
  }
}

/**
 * Converts a QuizState object to a string representation based on its current state.
 *
 * @param {QuizState} state - The current state of the quiz.
 * @return {string} A string representation of the given state.
 */
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

/**
 * Advances the quiz state to the next step based on the current state and the provided list of questions.
 *
 * @param {QuizState} state - The current state of the quiz.
 * @param {Question[]} questions - The list of questions in the quiz.
 * @return {QuizState | null} The updated quiz state or null if an invalid state is encountered.
 */
export function nextStep(state: QuizState, questions: Question[]): QuizState | null {
  const ids = questions.map((q) => q.id).sort((a, b) => a - b);
  switch (state.state) {
    case 'NOT_STARTED':
      if (!ids.length) {
        return { state: 'FINISHED' };
      }
      return { state: 'PREPARE_QUESTION', id: ids[0] };
    case 'PREPARE_QUESTION':
      return { state: 'QUESTION', id: state.id };
    case 'QUESTION':
      return { state: 'CLOSED_QUESTION', id: state.id };
    case 'CLOSED_QUESTION': {
      const currentIndex = ids.findIndex((id) => id === state.id);
      if (currentIndex === ids.length - 1) {
        return { state: 'FINISHED' };
      }
      return { state: 'PREPARE_QUESTION', id: ids[currentIndex + 1] };
    }
    default:
      return null;
  }
}
