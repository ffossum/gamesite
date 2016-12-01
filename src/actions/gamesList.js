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
    dispatch({
      type: JOIN_LOBBY,
      payload: {
        lastRefreshed,
      },
      meta: {
        socket: true,
        deepstream: {
          rpc: (err, result) => {
            dispatch(lobbyRefreshed(result));
          },
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
  return dispatch => {
    dispatch({
      type: CREATE_GAME,
      payload: data,
      meta: {
        socket: game => {
          if (game) {
            dispatch(createGameSuccess(game));
          }
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
