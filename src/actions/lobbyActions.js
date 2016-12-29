import { getUserData } from './userData';
import { userIdSelector } from 'selectors/commonSelectors';
export const JOIN_LOBBY = 'games/JOIN_LOBBY';
export const LEAVE_LOBBY = 'games/LEAVE_LOBBY';

export const REFRESH_LOBBY_REQUEST = 'games/REFRESH_LOBBY_REQUEST';
export const REFRESH_LOBBY_SUCCESS = 'games/REFRESH_LOBBY_SUCCESS';

export const CREATE_GAME = 'games/CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'games/CREATE_GAME_SUCCESS';

export const GAME_CREATED = 'games/GAME_CREATED';
export const UPDATE_GAME = 'games/UPDATE_GAME';

export const GAMES_UPDATED = 'games/UPDATED';

export function updateGame(game) {
  return {
    type: UPDATE_GAME,
    payload: {
      game,
    },
  };
}

export function gamesUpdated(games) {
  return {
    type: GAMES_UPDATED,
    payload: {
      games,
    },
  };
}

export function refreshLobbySuccess({ games, refreshed }) {
  return {
    type: REFRESH_LOBBY_SUCCESS,
    payload: {
      games,
      refreshed,
    },
  };
}

export function refreshLobby({ games, refreshed }) {
  return {
    type: REFRESH_LOBBY_REQUEST,
    payload: {
      games,
      refreshed,
    },
  };
}

export function joinLobby() {
  return {
    type: JOIN_LOBBY,
  };
}

export function leaveLobby() {
  return {
    type: LEAVE_LOBBY,
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
    const userId = userIdSelector(getState());
    const type = CREATE_GAME;
    const payload = {
      user: { id: userId },
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
