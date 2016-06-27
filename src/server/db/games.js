import shortid from 'shortid';
import _ from 'lodash';
import r from 'rethinkdb';
import {
  NOT_STARTED,
  IN_PROGRESS,
  ENDED,
} from 'constants/gameStatus';
import {
  getInitialState,
  performAction,
  isGameOver,
  asViewedBy,
} from 'games/rps/rps';

async function create(rdbConn, data) {
  const { host, options } = data;
  const { comment } = options;
  const gameId = shortid.generate();

  const game = {
    id: gameId,
    host,
    comment,
    status: NOT_STARTED,
    users: [host],
  };

  try {
    await r.table('games')
      .insert(game)
      .run(rdbConn);

    return game;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function join(rdbConn, gameId, userId) {
  try {
    const result = await r.table('games')
      .get(gameId)
      .update({
        users: r.row('users').setInsert(userId),
      })
      .run(rdbConn);

    return result.replaced === 1 && result.errors === 0;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function leave(rdbConn, gameId, userId) {
  try {
    const result = await r.table('games')
      .get(gameId)
      .update({
        users: r.row('users').setDifference([userId]),
      })
      .run(rdbConn);

    return result.replaced === 1 && result.errors === 0;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function get(rdbConn, gameId, userId) {
  try {
    const foundGame = await r.table('games')
      .get(gameId)
      .run(rdbConn);

    return {
      ...foundGame,
      state: asViewedBy(foundGame.state, userId),
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function start(rdbConn, gameId, userId) {
  try {
    const query = r.table('games')
      .getAll(gameId)
      .filter(game => (
        game('id').eq(gameId).and(game('host').eq(userId))
      ));

    await query.update({
      status: IN_PROGRESS,
    }).run(rdbConn);

    const { users } = await get(rdbConn, gameId);
    const state = getInitialState(users);

    await query.update({
      state,
    }).run(rdbConn);

    return asViewedBy(state, userId);
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getUserGames(rdbConn, userId) {
  const cursor = await r.table('games')
    .getAll(userId, { index: 'users' })
    .filter(game => game('status').ne(ENDED))
    .run(rdbConn);

  let games = await cursor.toArray();

  games = _.map(games, game => ({
    ...game,
    state: asViewedBy(game.state, userId),
  }));

  return _.keyBy(games, game => game.id);
}

export async function getNotStarted(rdbConn) {
  const cursor = await r.table('games')
    .filter(game => game('status').eq(NOT_STARTED))
    .run(rdbConn);

  const games = await cursor.toArray();

  return _.keyBy(games, game => game.id);
}

export async function performGameAction(rdbConn, gameId, userId, action) {
  try {
    const game = await r.table('games')
      .get(gameId)
      .run(rdbConn);

    if (!_.includes(game.users, userId)) {
      return false;
    }

    const newState = performAction(game.state, userId, action);
    if (newState === game.state) {
      return false;
    }

    const gameOver = isGameOver(newState);
    const newStatus = gameOver ? ENDED : game.status;

    await r.table('games').get(gameId).update({
      state: r.literal(newState),
      status: newStatus,
    })
    .run(rdbConn);

    return {
      users: game.users,
      previousState: game.state,
      newState,
      gameOver,
    };
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
