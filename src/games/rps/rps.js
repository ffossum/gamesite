// @flow

import {
  map,
  mapValues,
  keyBy,
  includes,
  without,
  every,
  some,
  omit,
  values,
  isEmpty,
  keys,
  flow,
  get,
  cloneDeep,
} from 'lodash/fp';
import {
  ROCK, PAPER, SCISSORS,
} from './constants';

import defaultOptions from './options/defaultValues';

import type {
  Action,
  Hand,
  Game,
  Player,
  PlayerId,
  State,
  Options,
} from './types';

export function getInitialState(userIds: string[]): State {
  const players = flow(
    map(id => ({ id, score: 0, history: [] })),
    keyBy(get('id')),
  )(userIds);

  return {
    players,
    active: [...userIds],
  };
}

function beats(hand?: Hand, otherHand?: Hand): boolean {
  switch (hand) {
    case ROCK: return otherHand === SCISSORS;
    case PAPER: return otherHand === ROCK;
    case SCISSORS: return otherHand === PAPER;
    default: return false;
  }
}

function getWinner(players: Player[]): ?Player {
  if (beats(players[0].action, players[1].action)) {
    return players[0];
  } else if (beats(players[1].action, players[0].action)) {
    return players[1];
  }

  return null;
}

function moveActionToHistory(player: Player): Player {
  const playerAction = player.action;
  const modifiedPlayer = omit('action', player);
  modifiedPlayer.history = [...modifiedPlayer.history, playerAction];
  return modifiedPlayer;
}

export function isGameOver({ state, options = defaultOptions }: Game): boolean {
  return some(player => (
    player.score >= options.firstTo
  ), state.players);
}

export function getNextState(
  previousState: State,
  userId: string,
  action: Hand,
  options: Options = defaultOptions
): State {
  if (!includes(userId, previousState.active) || isGameOver({ state: previousState, options })) {
    return previousState;
  }

  const state: State = cloneDeep(previousState);

  state.players[userId].action = action;
  state.active = without([userId], state.active);

  if (every(player => player.action, state.players)) {
    const winner = getWinner(values(state.players));
    if (winner) {
      winner.score++;
    }
    state.players = mapValues(moveActionToHistory, state.players);
  }

  if (isEmpty(state.active)) {
    state.active = keys(state.players);
  }

  if (isGameOver({ state, options })) {
    state.active = [];
  }

  return state;
}

export function performAction(game: Game, userId: PlayerId, action: Action): Game {
  const nextState = getNextState(game.state, userId, action, game.options);

  if (game.state === nextState) {
    return game;
  }

  return {
    ...game,
    state: nextState,
  };
}

export function asViewedBy(state: State, userId?: PlayerId): State {
  if (!state) {
    return state;
  }

  const viewedPlayers = mapValues(player => (
    player.id === userId ? player : omit('action', player)
  ), state.players);

  return {
    ...state,
    players: viewedPlayers,
  };
}
