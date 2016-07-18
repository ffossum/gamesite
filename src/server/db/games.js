import shortid from 'shortid';
import _ from 'lodash';
import r from './rethinkdb';
import {
  NOT_STARTED,
  IN_PROGRESS,
  ENDED,
} from 'constants/gameStatus';
import {
  info,
  getInitialState,
  performAction,
  isGameOver,
  asViewedBy,
} from 'games/rps/';

async function create({ data, host }) {
  const { options, comment, playerCount } = data;
  const gameId = shortid.generate();
  const { required, optional } = playerCount;

  if (!_.includes(info.playerCount, required) ||
      !_.includes(info.playerCount, required + optional)) {
    // Illegal player count
    return null;
  }

  const game = {
    id: gameId,
    host,
    playerCount,
    comment,
    options,
    status: NOT_STARTED,
    users: [host],
    created: new Date(),
  };

  try {
    await r.table('games')
      .insert(game)
      .run();

    return game;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function join(gameId, userId) {
  try {
    const result = await r.table('games')
      .get(gameId)
      .update({
        users: r.row('users').setInsert(userId),
      })
      .run();

    return result.replaced === 1 && result.errors === 0;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function leave(gameId, userId) {
  try {
    const result = await r.table('games')
      .get(gameId)
      .update({
        users: r.row('users').setDifference([userId]),
      })
      .run();

    return result.replaced === 1 && result.errors === 0;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function get(gameId, userId) {
  try {
    const foundGame = await r.table('games')
      .get(gameId)
      .run();

    return {
      ...foundGame,
      state: asViewedBy(foundGame.state, userId),
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function start(gameId, userId) {
  try {
    const gameQuery = r.table('games').get(gameId);
    const game = await gameQuery.run();

    if (!_.includes(info.playerCount, _.size(game.users))) {
      // Illegal player count
      return false;
    }
    const state = getInitialState(game.users);

    const result = await gameQuery.replace(
      r.branch(
        r.row('users').eq(game.users),
        r.row.merge({
          state,
          status: IN_PROGRESS,
        }),
        r.error('users changed between validation and write')
      )
    )
    .run();

    if (result.replaced === 1) {
      return asViewedBy(state, userId);
    }

    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getUserGames(userId) {
  let games = await r.table('games')
    .getAll(userId, { index: 'users' })
    .filter(game => game('status').ne(ENDED))
    .run();

  games = _.map(games, game => ({
    ...game,
    state: asViewedBy(game.state, userId),
  }));

  return _.keyBy(games, game => game.id);
}

export async function getNotStarted() {
  const games = await r.table('games')
    .filter(game => game('status').eq(NOT_STARTED))
    .run();

  return _.keyBy(games, game => game.id);
}

export async function performGameAction(gameId, userId, action) {
  try {
    const gameQuery = r.table('games').get(gameId);
    const game = await gameQuery.run();

    if (!_.includes(game.users, userId)) {
      return false;
    }

    const newGameData = performAction(game, userId, action);
    const newState = newGameData.state;
    if (newState === game.state) {
      return false;
    }

    const gameOver = isGameOver(newGameData);
    const newStatus = gameOver ? ENDED : game.status;

    const result = await gameQuery.replace(
      r.branch(
        r.row('state').eq(game.state),
        r.row.merge({
          state: r.literal(newState),
          status: newStatus,
        }),
        r.error('game state changed before write')
      )
    )
    .run();

    if (result.replaced === 1) {
      return {
        users: game.users,
        previousState: game.state,
        newState,
        gameOver,
      };
    }

    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default {
  create,
  join,
  leave,
  start,
  get,
  getNotStarted,
  getUserGames,
  performGameAction,
};
