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
  pick,
  orderBy,
  isEmpty,
  keys,
} from 'lodash';
import {
  ROCK, PAPER, SCISSORS,
} from './constants';

export function getInitialState(userIds) {
  let players = map(userIds, userId => ({
    id: userId,
    score: 0,
    history: [],
  }));

  players = keyBy(players, player => player.id);

  return {
    players,
    active: [...userIds],
  };
}

function beats(action = '', otherAction = '') {
  switch (action) {
    case ROCK: return otherAction === SCISSORS;
    case PAPER: return otherAction === ROCK;
    case SCISSORS: return otherAction === PAPER;
    default: return false;
  }
}

function getWinner(players) {
  if (beats(players[0].action, players[1].action)) {
    return players[0];
  } else if (beats(players[1].action, players[0].action)) {
    return players[1];
  }

  return null;
}

function moveActionToHistory(player) {
  const playerAction = player.action;
  const modifiedPlayer = omit(player, 'action');
  modifiedPlayer.history.push(playerAction);
  return modifiedPlayer;
}

export function isGameOver({ state, options = {} }) {
  return some(state.players, player => (
    player.score >= options.firstTo
  ));
}

export function getNextState(previousState, userId, action, options = {}) {
  if (!includes(previousState.active, userId) || isGameOver({ state: previousState, options })) {
    return previousState;
  }

  const state = JSON.parse(JSON.stringify(previousState));

  state.players[userId].action = action;
  state.active = without(state.active, userId);

  if (every(state.players, player => player.action)) {
    const winner = getWinner(values(state.players));
    if (winner) {
      winner.score++;
    }
    state.players = mapValues(state.players, moveActionToHistory);
  }

  if (isEmpty(state.active)) {
    state.active = keys(state.players);
  }

  if (isGameOver({ state, options })) {
    state.active = [];
  }

  return state;
}

export function performAction(game, userId, action) {
  const nextState = getNextState(game.state, userId, action, game.options);

  if (game.state === nextState) {
    return game;
  }

  return {
    ...game,
    state: nextState,
  };
}

export function getGameSummary(state) {
  const players = map(state.players, player => (
    pick(player, ['id', 'score'])
  ));

  return orderBy(players, 'score', 'desc');
}

export function asViewedBy(state, userId = false) {
  if (!state) {
    return state;
  }

  const viewedPlayers = mapValues(state.players, player => (
    player.id === userId ? player : omit(player, 'action')
  ));

  return {
    ...state,
    players: viewedPlayers,
  };
}
