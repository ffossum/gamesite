/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import { every, find } from 'lodash';
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
  it('players start with score 0', () => {
    const state = getInitialState(['1', '2']);
    const allZero = every(state.players, player => player.score === 0);
    expect(allZero).to.be.true;
  });

  it('players take their turns simultaneously', () => {
    const state = getInitialState(['1', '2']);

    expect(state.active).to.have.length(2);
    expect(state.active).to.include('1');
    expect(state.active).to.include('2');
  });

  it('a player chooses rock, paper or scissors', () => {
    let state = getInitialState(['1', '2']);
    state = getNextState(state, '1', ROCK);

    expect(state.active).to.have.length(1);

    const player = find(state.players, { id: '1' });
    expect(player.action).to.equal(ROCK);
  });

  it('rock crushes scissors', () => {
    let state = getInitialState(['1', '2']);
    state = getNextState(state, '1', ROCK);
    state = getNextState(state, '2', SCISSORS);

    expect(state.players['1'].score).to.equal(1);
    expect(state.players['2'].score).to.equal(0);
  });

  it('paper wraps rock', () => {
    let state = getInitialState(['1', '2']);
    state = getNextState(state, '1', ROCK);
    state = getNextState(state, '2', PAPER);

    expect(state.players['1'].score).to.equal(0);
    expect(state.players['2'].score).to.equal(1);
  });

  it('scissors cut paper', () => {
    let state = getInitialState(['1', '2']);
    state = getNextState(state, '1', ROCK);
    state = getNextState(state, '2', PAPER);

    expect(state.players['1'].score).to.equal(0);
    expect(state.players['2'].score).to.equal(1);
  });

  it('game ends when a player reaches required score', () => {
    let state = getInitialState(['1', '2']);
    const options = { firstTo: 1 };
    state = getNextState(state, '1', ROCK);
    expect(isGameOver({ state, options })).to.equal(false);

    state = getNextState(state, '2', PAPER);
    expect(isGameOver({ state, options })).to.equal(true);
  });

  describe('as viewed by players', () => {
    it('hides actions by other players', () => {
      let state = getInitialState(['1', '2']);
      state = getNextState(state, '1', ROCK);

      expect(state.players['1'].action).to.equal(ROCK);
      const viewedState = asViewedBy(state, '2');
      expect(viewedState.players['2'].action).to.be.undefined;
    });

    it('lets users see their own actions', () => {
      let state = getInitialState(['1', '2']);
      state = getNextState(state, '1', ROCK);

      expect(state.players['1'].action).to.equal(ROCK);
      const viewedState = asViewedBy(state, '1');
      expect(viewedState.players['1'].action).to.equal(ROCK);
    });
  });
});
