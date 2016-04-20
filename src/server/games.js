import shortid from 'shortid';
import {
  getUserById,
  addGameToUser,
  removeGameFromUser,
} from './db';
import _ from 'lodash';

const notStarted = {};
const inProgress = {};

function create(options) {
  const gameId = shortid.generate();
  const game = {
    id: gameId,
    host: options.host,
    users: [options.host],
  };

  notStarted[game.id] = game;

  addGameToUser(options.host, gameId);

  return game;
}

function join(gameId, userId) {
  const game = notStarted[gameId];
  if (game) {
    game.users.push(userId);
    addGameToUser(userId, gameId);
  }

  return game;
}

function leave(gameId, userId) {
  const game = notStarted[gameId];
  if (game) {
    game.users = _.without(game.users, userId);
    removeGameFromUser(userId, gameId);
  }

  return game;
}

export async function getUserGames(userId) {
  const containsUser = game => _.includes(game.users, userId);
  return {
    ..._.pickBy(notStarted, containsUser),
    ..._.pickBy(inProgress, containsUser),
  };
}

export async function getUserGameIds(userId) {
  const user = await getUserById(userId);
  return [...user.games];
}

function get(gameId) {
  return notStarted[gameId] || inProgress[gameId];
}

function getJoinable() {
  return { ...notStarted };
}

function getAll() {
  return { ...notStarted, ...inProgress };
}

export default {
  create,
  join,
  leave,
  get,
  getJoinable,
  getAll,
  getUserGames,
};
