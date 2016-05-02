import { getUserData } from './userData';
import _ from 'lodash';

export const JOIN_LOBBY = 'games/JOIN_LOBBY';
export const LEAVE_LOBBY = 'games/LEAVE_LOBBY';
export const REFRESH_LOBBY = 'games/REFRESH_LOBBY';

export const CREATE_GAME = 'games/CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'games/CREATE_GAME_SUCCESS';

export const GAME_CREATED = 'games/GAME_CREATED';

export function joinLobby() {
  return {
    type: JOIN_LOBBY,
    meta: {
      socket: true,
    },
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

export function refreshLobby(games) {
  return dispatch => {
    const users = _.chain(games)
      .map(game => game.users)
      .flatten()
      .value();

    dispatch(getUserData(...users));
    dispatch({
      type: REFRESH_LOBBY,
      payload: {
        games,
      },
    });
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

export function createGame(options, custom) {
  return dispatch => {
    dispatch({
      type: CREATE_GAME,
      payload: {
        options,
        custom,
      },
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
