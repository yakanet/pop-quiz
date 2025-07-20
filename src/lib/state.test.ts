import { describe, expect, it } from 'vitest';
import { nextStep, parseState, stateToString } from './state';
import type { QuizState } from '$lib/quiz.model';
import type { Question } from '$lib/server/db/schema';

describe('State', () => {
  describe('parseState', () => {
    it('should return state as NOT_STARTED for "NOT_STARTED"', () => {
      const result = parseState('NOT_STARTED');
      expect(result).toEqual({ state: 'NOT_STARTED' });
    });

    it('should return state as FINISHED for "FINISHED"', () => {
      const result = parseState('FINISHED');
      expect(result).toEqual({ state: 'FINISHED' });
    });

    it('should parse PREPARE_QUESTION state with valid ID', () => {
      const result = parseState('PREPARE_QUESTION#1');
      expect(result).toEqual({ state: 'PREPARE_QUESTION', id: 1 });
    });

    it('should parse QUESTION state with valid ID', () => {
      const result = parseState('QUESTION#2');
      expect(result).toEqual({ state: 'QUESTION', id: 2 });
    });

    it('should parse ANSWERED state with valid ID', () => {
      const result = parseState('ANSWERED#3');
      expect(result).toEqual({ state: 'ANSWERED', id: 3 });
    });

    it('should parse CLOSED_QUESTION state with valid ID', () => {
      const result = parseState('CLOSED_QUESTION#4');
      expect(result).toEqual({ state: 'CLOSED_QUESTION', id: 4 });
    });

    it('should return UNKNOWN state for an unrecognized string', () => {
      const result = parseState('SOME_OTHER_STATE');
      expect(result).toEqual({ state: 'UNKNOWN', raw: 'SOME_OTHER_STATE' });
    });

    it('should return UNKNOWN state for an incorrect format', () => {
      const result = parseState('QUESTION#INVALID');
      expect(result).toEqual({ state: 'UNKNOWN', raw: 'QUESTION#INVALID' });
    });
  });

  describe('stateToString', () => {
    it('should return "NOT_STARTED" for a NOT_STARTED state', () => {
      const state: QuizState = { state: 'NOT_STARTED' };
      expect(stateToString(state)).toBe('NOT_STARTED');
    });

    it('should return "FINISHED" for a FINISHED state', () => {
      const state: QuizState = { state: 'FINISHED' };
      expect(stateToString(state)).toBe('FINISHED');
    });

    it('should return "PREPARE_QUESTION#1" for a PREPARE_QUESTION state with ID 1', () => {
      const state: QuizState = { state: 'PREPARE_QUESTION', id: 1 };
      expect(stateToString(state)).toBe('PREPARE_QUESTION#1');
    });

    it('should return "QUESTION#2" for a QUESTION state with ID 2', () => {
      const state: QuizState = { state: 'QUESTION', id: 2 };
      expect(stateToString(state)).toBe('QUESTION#2');
    });

    it('should return "ANSWERED#3" for an ANSWERED state with ID 3', () => {
      const state: QuizState = { state: 'ANSWERED', id: 3 };
      expect(stateToString(state)).toBe('ANSWERED#3');
    });

    it('should return "CLOSED_QUESTION#4" for a CLOSED_QUESTION state with ID 4', () => {
      const state: QuizState = { state: 'CLOSED_QUESTION', id: 4 };
      expect(stateToString(state)).toBe('CLOSED_QUESTION#4');
    });

    it('should return "UNKNOWN" for an unrecognized state', () => {
      const state: QuizState = { state: 'UNKNOWN', raw: 'INVALID' };
      expect(stateToString(state)).toBe('UNKNOWN');
    });

    it('should return "UNKNOWN" for an invalid state format', () => {
      const state: any = { state: 'INVALID_STATE' };
      expect(stateToString(state)).toBe('UNKNOWN');
    });
  });

  describe('nextStep', () => {
    it('should transition from NOT_STARTED to PREPARE_QUESTION with the first question ID', () => {
      const state: QuizState = { state: 'NOT_STARTED' };
      const questions = [{ id: 1 }, { id: 2 }] as Question[];
      const result = nextStep(state, questions);
      expect(result).toEqual({ state: 'PREPARE_QUESTION', id: 1 });
    });

    it('should transition from NOT_STARTED to FINISHED when no questions exist', () => {
      const state: QuizState = { state: 'NOT_STARTED' };
      const questions = [] as Question[];
      const result = nextStep(state, questions);
      expect(result).toEqual({ state: 'FINISHED' });
    });

    it('should transition from PREPARE_QUESTION to QUESTION with the same ID', () => {
      const state: QuizState = { state: 'PREPARE_QUESTION', id: 1 };
      const questions = [{ id: 1 }, { id: 2 }] as Question[];
      const result = nextStep(state, questions);
      expect(result).toEqual({ state: 'QUESTION', id: 1 });
    });

    it('should transition from QUESTION to CLOSED_QUESTION with the same ID', () => {
      const state: QuizState = { state: 'QUESTION', id: 2 };
      const questions = [{ id: 1 }, { id: 2 }] as Question[];
      const result = nextStep(state, questions);
      expect(result).toEqual({ state: 'CLOSED_QUESTION', id: 2 });
    });

    it('should transition from CLOSED_QUESTION to PREPARE_QUESTION with next question ID', () => {
      const state: QuizState = { state: 'CLOSED_QUESTION', id: 1 };
      const questions = [{ id: 1 }, { id: 2 }] as Question[];
      const result = nextStep(state, questions);
      expect(result).toEqual({ state: 'PREPARE_QUESTION', id: 2 });
    });

    it('should transition from CLOSED_QUESTION to FINISHED if it is the last question', () => {
      const state: QuizState = { state: 'CLOSED_QUESTION', id: 2 };
      const questions = [{ id: 1 }, { id: 2 }] as Question[];
      const result = nextStep(state, questions);
      expect(result).toEqual({ state: 'FINISHED' });
    });

    it('should return null for an invalid state', () => {
      const state: QuizState = { state: 'UNKNOWN', raw: 'INVALID' };
      const questions = [{ id: 1 }, { id: 2 }] as Question[];
      const result = nextStep(state, questions);
      expect(result).toBeNull();
    });
  });
});
