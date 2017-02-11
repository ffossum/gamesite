/* @flow */
/* eslint-env jest */
import { every, find } from 'lodash/fp';
import {
  getInitialState,
  getNextState,
  isGameOver,
  asViewedBy,
} from './rps';
import {
  ROCK, PAPER, SCISSORS,
} from './constants';

describe('rock paper scissors', () => {
  test('players start with score 0', () => {
    const state = getInitialState(['1', '2']);
    const allZero = every(player => player.score === 0, state.players);
    expect(allZero).toBe(true);
  });

  test('players take their turns simultaneously', () => {
    const state = getInitialState(['1', '2']);

    expect(state.active).toHaveLength(2);
    expect(state.active).toContain('1');
    expect(state.active).toContain('2');
  });

  test('a player chooses rock, paper or scissors', () => {
    let state = getInitialState(['1', '2']);
    state = getNextState(state, '1', ROCK);

    expect(state.active).toHaveLength(1);

    const player = find({ id: '1' }, state.players);
    expect(player.action).toBe(ROCK);
  });

  describe('game state object', () => {
    test('is not mutated', () => {
      const initialState = getInitialState(['1', '2']);
      const nextState = getNextState(initialState, '1', ROCK);
      expect(initialState).not.toBe(nextState);
    });
  });

  test('rock crushes scissors', () => {
    let state = getInitialState(['1', '2']);
    state = getNextState(state, '1', ROCK);
    state = getNextState(state, '2', SCISSORS);

    expect(state.players['1'].score).toBe(1);
    expect(state.players['2'].score).toBe(0);
  });

  test('paper wraps rock', () => {
    let state = getInitialState(['1', '2']);
    state = getNextState(state, '1', ROCK);
    state = getNextState(state, '2', PAPER);

    expect(state.players['1'].score).toBe(0);
    expect(state.players['2'].score).toBe(1);
  });

  test('scissors cut paper', () => {
    let state = getInitialState(['1', '2']);
    state = getNextState(state, '1', ROCK);
    state = getNextState(state, '2', PAPER);

    expect(state.players['1'].score).toBe(0);
    expect(state.players['2'].score).toBe(1);
  });

  test('game ends when a player reaches required score', () => {
    let state = getInitialState(['1', '2']);
    const options = { firstTo: 1 };
    state = getNextState(state, '1', ROCK);
    expect(isGameOver({ state, options })).toBe(false);

    state = getNextState(state, '2', PAPER);
    expect(isGameOver({ state, options })).toBe(true);
  });

  describe('as viewed by players', () => {
    test('hides actions by other players', () => {
      let state = getInitialState(['1', '2']);
      state = getNextState(state, '1', ROCK);

      expect(state.players['1'].action).toBe(ROCK);
      const viewedState = asViewedBy(state, '2');
      expect(viewedState.players['2'].action).toBe(undefined);
    });

    test('lets users see their own actions', () => {
      let state = getInitialState(['1', '2']);
      state = getNextState(state, '1', ROCK);

      expect(state.players['1'].action).toBe(ROCK);
      const viewedState = asViewedBy(state, '1');
      expect(viewedState.players['1'].action).toBe(ROCK);
    });
  });
});
