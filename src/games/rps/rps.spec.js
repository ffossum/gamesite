/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import { every, find } from 'lodash';
import {
  getInitialState,
  performAction,
  isGameOver,
  ROCK, PAPER, SCISSORS,
} from './rps';

describe('rock paper scissors', () => {
  it('players start with score 0', () => {
    const state = getInitialState(['1', '2']);
    const allZero = every(state.players, player => player.score === 0);
    expect(allZero).to.be.true;
  });

  it('required score to win is decided before game begins', () => {
    const state = getInitialState(['1', '2'], { firstTo: 5 });
    expect(state.firstTo).to.equal(5);
  });

  it('players take their turns simultaneously', () => {
    const state = getInitialState(['1', '2']);

    expect(state.active).to.have.length(2);
    expect(state.active).to.include('1');
    expect(state.active).to.include('2');
  });

  it('a player chooses rock, paper or scissors', () => {
    let state = getInitialState(['1', '2']);
    state = performAction(state, '1', ROCK);

    expect(state.active).to.have.length(1);

    const player = find(state.players, { id: '1' });
    expect(player.action).to.equal(ROCK);
  });

  it('rock crushes scissors', () => {
    let state = getInitialState(['1', '2']);
    state = performAction(state, '1', ROCK);
    state = performAction(state, '2', SCISSORS);

    expect(state.players['1'].score).to.equal(1);
    expect(state.players['2'].score).to.equal(0);
  });

  it('paper wraps rock', () => {
    let state = getInitialState(['1', '2']);
    state = performAction(state, '1', ROCK);
    state = performAction(state, '2', PAPER);

    expect(state.players['1'].score).to.equal(0);
    expect(state.players['2'].score).to.equal(1);
  });

  it('scissors cut paper', () => {
    let state = getInitialState(['1', '2']);
    state = performAction(state, '1', ROCK);
    state = performAction(state, '2', PAPER);

    expect(state.players['1'].score).to.equal(0);
    expect(state.players['2'].score).to.equal(1);
  });

  it('game ends when a player reaches required score', () => {
    let state = getInitialState(['1', '2'], { firstTo: 1 });

    state = performAction(state, '1', ROCK);
    expect(isGameOver(state)).to.equal(false);

    state = performAction(state, '2', PAPER);
    expect(isGameOver(state)).to.equal(true);
  });
});
