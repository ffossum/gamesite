import { getUserData } from './userData';
import {
  chain,
  get,
} from 'lodash';

export const JOIN_LOBBY = 'games/JOIN_LOBBY';
export const LEAVE_LOBBY = 'games/LEAVE_LOBBY';
export const REFRESH_LOBBY = 'games/REFRESH_LOBBY';

export const CREATE_GAME = 'games/CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'games/CREATE_GAME_SUCCESS';

export const GAME_CREATED = 'games/GAME_CREATED';
export const UPDATE_GAME = 'games/UPDATE_GAME';

export function updateGame(game) {
  return {
    type: UPDATE_GAME,
    payload: {
      game,
    },
  };
}

export function lobbyRefreshed({ games, refreshed }) {
  return {
    type: REFRESH_LOBBY,
    payload: {
      games,
      refreshed,
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

export function joinLobby() {
  return (dispatch, getState) => {
    const lastRefreshed = get(getState(), ['lobby', 'lastRefreshed']);
    const type = JOIN_LOBBY;
    const payload = { lastRefreshed };

    dispatch({
      type,
      payload,
      meta: {
        deepstream: socket => {
          socket.rpc(type, payload, (err, result) => {
            if (!err) {
              dispatch(refreshLobby(result));
              socket.subscribe('lobby');
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
      deepstream: socket => {
        socket.unsubscribe('lobby');
      },
    },
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
