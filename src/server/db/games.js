import shortid from 'shortid';
import _ from 'lodash';
import r from './rethinkdb';
import {
  NOT_STARTED,
  IN_PROGRESS,
  ENDED,
  CANCELED,
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

  try {
    const response = await r.table('games')
      .insert({
        id: gameId,
        host,
        playerCount,
        comment,
        options,
        status: NOT_STARTED,
        users: [host],
        created: r.now(),
        updated: r.now(),
      }, {
        returnChanges: true,
      })
      .run();

    return response.changes[0].new_val;
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
        updated: r.now(),
      }, { returnChanges: true })
      .run();

    return result.replaced === 1 && result.errors === 0 && result.changes[0].new_val;
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
        updated: r.now(),
      }, { returnChanges: true })
      .run();

    return result.replaced === 1 && result.errors === 0 && result.changes[0].new_val;
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

    if (!_.includes(info.playerCount, _.size(game.users)) || // Illegal player count
        game.host !== userId) { // User is not host
      return false;
    }
    const state = getInitialState(game.users);

    const result = await gameQuery.replace(
      r.branch(
        r.row('users').eq(game.users),
        r.row.merge({
          state,
          status: IN_PROGRESS,
          updated: r.now(),
          started: r.now(),
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

async function cancel(gameId, userId) {
  try {
    const result = await r.table('games')
      .get(gameId)
      .replace(
        r.branch(
          r.row('host').eq(userId),
          r.row.merge({
            status: CANCELED,
            canceled: r.now(),
          }),
          r.error('only host may cancel game')
        )
      )
      .run();

    if (result.replaced === 1) {
      return true;
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
    .filter(game => r([NOT_STARTED, IN_PROGRESS]).contains(game('status')))
    .run();

  games = _.map(games, game => ({
    ...game,
    state: asViewedBy(game.state, userId),
  }));

  return _.keyBy(games, game => game.id);
}

export async function getLobbyGames({ lastRefreshed } = {}) {
  let query = r.table('games')
    .filter(game => game('status').eq(NOT_STARTED));

  if (lastRefreshed) {
    const lastRefreshedDate = new Date(lastRefreshed);
    query = query.filter(game => game('updated').gt(lastRefreshedDate));

    const removalsQuery = r.table('games')
      .filter(game => r.or(
        game.hasFields('started').and(game('started').gt(lastRefreshedDate)),
        game.hasFields('canceled').and(game('canceled').gt(lastRefreshedDate)),
        game.hasFields('ended').and(game('ended').gt(lastRefreshedDate))
      ))
      .pluck(
        'id',
        'status',
      );

    query = query.union(removalsQuery);
  }

  const result = await r.do(
    query.pluck(
      'comment',
      'created',
      'host',
      'id',
      'options',
      'playerCount',
      'status',
      'updated',
      'users',
    ).coerceTo('array'),
    r.now(),
    (games, refreshed) => ({ games, refreshed }),
  ).run();

  return {
    games: _.keyBy(result.games, game => game.id),
    refreshed: result.refreshed,
  };
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

    const mergeData = {
      state: r.literal(newState),
      status: newStatus,
      updated: r.now(),
    };

    if (gameOver) {
      mergeData.ended = r.now();
    }

    const result = await gameQuery.replace(
      r.branch(
        r.row('state').eq(game.state),
        r.row.merge(mergeData),
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
  cancel,
  get,
  getLobbyGames,
  getUserGames,
  performGameAction,
};
