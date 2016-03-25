import shortid from 'shortid';

const notStarted = {};
const inProgress = {};

function create(options) {
  const gameId = shortid.generate();
  const game = {
    id: gameId,
    host: options.host,
    users: [options.host],
    messages: [],
  };

  notStarted[game.id] = game;

  return game;
}

function join(gameId, userId) {
  const game = notStarted[gameId];
  if (game) {
    game.users.push(userId);
  }

  return game;
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
};
