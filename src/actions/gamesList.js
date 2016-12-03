import { getUserData } from './userData';
import {
  chain,
  get,
  forEach,
  map,
  difference,
} from 'lodash';
import {
  gamesNotStartedSelector,
} from 'selectors/commonSelectors';
import {
  getGameChannelName,
} from 'util/channelUtils';

export const JOIN_LOBBY = 'games/JOIN_LOBBY';
export const LEAVE_LOBBY = 'games/LEAVE_LOBBY';
export const REFRESH_LOBBY = 'games/REFRESH_LOBBY';

export const CREATE_GAME = 'games/CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'games/CREATE_GAME_SUCCESS';

export const GAME_CREATED = 'games/GAME_CREATED';

export function lobbyRefreshed({ games, refreshed }) {
  return {
    type: REFRESH_LOBBY,
    payload: {
      games,
      refreshed,
    },
  };
}

export function joinLobby() {
  return (dispatch, getState) => {
    const lastRefreshed = get(getState(), ['lobby', 'lastRefreshed']);
    const type = JOIN_LOBBY;
    const payload = { lastRefreshed };

    dispatch({
      type,
      payload,
      meta: {
        socket: true,
        deepstream: socket => {
          const previousGames = gamesNotStartedSelector(getState());
          const previousIds = map(previousGames, game => game.id);
          forEach(previousIds, gameId => socket.subscribe(getGameChannelName(gameId)));

          socket.rpc(type, payload, (err, result) => {
            if (!err) {
              dispatch(lobbyRefreshed(result));

              const games = gamesNotStartedSelector(getState());
              const gameIds = map(games, game => game.id);

              const addedIds = difference(gameIds, previousIds);
              const removedIds = difference(previousIds, gameIds);

              forEach(addedIds, gameId => socket.subscribe(getGameChannelName(gameId)));
              forEach(removedIds, gameId => socket.unsubscribe(getGameChannelName(gameId)));
            }
          });
        },
      },
    });
  };
}

export function leaveLobby() {
  return {
    type: LEAVE_LOBBY,
    meta: {
      socket: true,
    },
  };
}

export function refreshLobby({ games, refreshed }) {
  return dispatch => {
    const users = chain(games)
      .map(game => game.users)
      .flatten()
      .value();

    dispatch(getUserData(...users));
    dispatch(lobbyRefreshed({ games, refreshed }));
  };
}

function createGameSuccess(game) {
  return {
    type: CREATE_GAME_SUCCESS,
    payload: {
      game,
    },
    meta: {
      history: {
        method: 'push',
        args: [`/game/${game.id}`],
      },
    },
  };
}

export function createGame(data) {
  return (dispatch, getState) => {
    const userId = get(getState(), ['session', 'userId']);
    const type = CREATE_GAME;
    const payload = {
      user: userId,
      game: data,
    };

    dispatch({
      type,
      payload,
      meta: {
        deepstream: socket => {
          socket.rpc(type, payload, (err, game) => {
            if (game) {
              dispatch(createGameSuccess(game));
            }
          });
        },
      },
    });
  };
}

export function gameCreated(game) {
  return dispatch => {
    dispatch(getUserData(...game.users));
    dispatch({
      type: GAME_CREATED,
      payload: {
        game,
      },
    });
  };
}

export default {
  joinLobby,
  leaveLobby,
  createGame,
};
