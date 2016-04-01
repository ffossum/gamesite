import shortid from 'shortid';
import {
  getUserById,
  addGameToUser,
} from './db';

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

export async function getUserGames(userId) {
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
  get,
  getJoinable,
  getAll,
  getUserGames,
};
