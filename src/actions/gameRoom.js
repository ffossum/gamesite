import { getUserData } from './userData';
import { get } from 'lodash';

export const JOIN_GAME = 'gameRoom/JOIN_GAME';
export const PLAYER_JOINED = 'gameRoom/PLAYER_JOINED';
export const LEAVE_GAME = 'gameRoom/LEAVE_GAME';
export const PLAYER_LEFT = 'gameRoom/PLAYER_LEFT';

export const ENTER_ROOM = 'gameRoom/ENTER_ROOM';
export const LEAVE_ROOM = 'gameRoom/LEAVE_ROOM';
export const REFRESH_GAME = 'gameRoom/REFRESH';
export const GAME_NOT_FOUND = 'gameRoom/NOT_FOUND';
export const GET_GAME_DATA = 'gameRoom/GET_DATA';

export const START_GAME = 'gameRoom/START_GAME';
export const GAME_STARTED = 'gameRoom/GAME_STARTED';
export const GAME_ENDED = 'gameRoom/ENDED';

export const CANCEL_GAME = 'gameRoom/CANCEL';
export const GAME_CANCELED = 'gameRoom/CANCELED';

export function refreshGame(game) {
  return dispatch => {
    dispatch(getUserData(...game.users));
    dispatch({
      type: REFRESH_GAME,
      payload: {
        game,
      },
    });
  };
}

function gameNotFound(gameId) {
  return {
    type: GAME_NOT_FOUND,
    payload: {
      game: { id: gameId },
    },
  };
}

export function getGameData(gameId) {
  return dispatch => {
    dispatch({
      type: GET_GAME_DATA,
      payload: gameId,
      meta: {
        socket: game => {
          if (game) {
            dispatch(refreshGame(game));
          } else {
            dispatch(gameNotFound(gameId));
          }
        },
      },
    });
  };
}

export function enterRoom(gameId) {
  return dispatch => {
    dispatch({
      type: ENTER_ROOM,
      payload: gameId,
      meta: {
        socket: (err, game) => {
          if (game) {
            dispatch(refreshGame(game));
          } else if (err) {
            dispatch(gameNotFound(gameId));
          }
        },
      },
    });
  };
}

export function leaveRoom(gameId) {
  return {
    type: LEAVE_ROOM,
    payload: gameId,
    meta: {
      socket: true,
    },
  };
}

export function playerJoined(gameId, userId) {
  return dispatch => {
    dispatch(getUserData(userId));
    dispatch({
      type: PLAYER_JOINED,
      payload: {
        game: { id: gameId },
        user: { id: userId },
      },
    });
  };
}

export function joinGame(gameId) {
  return (dispatch, getState) => {
    const userId = get(getState(), ['session', 'userId']);
    if (!userId) {
      return;
    }

    const type = JOIN_GAME;
    const payload = {
      game: { id: gameId },
      user: { id: userId },
    };
    dispatch({
      type,
      payload,
      meta: {
        deepstream: socket => {
          socket.rpc(JOIN_GAME, payload, () => {});
        },
      },
    });
  };
}

export function playerLeft(gameId, userId) {
  return {
    type: PLAYER_LEFT,
    payload: {
      game: { id: gameId },
      user: { id: userId },
    },
  };
}

export function leaveGame(gameId) {
  return (dispatch, getState) => {
    const userId = get(getState(), ['session', 'userId']);
    if (!userId) {
      return;
    }

    dispatch({
      type: LEAVE_GAME,
      payload: {
        game: {
          id: gameId,
        },
      },
      meta: {
        socket: left => {
          if (left) {
            dispatch(playerLeft(gameId, userId));
          }
        },
      },
    });
  };
}

export function gameStarted(gameId, gameState) {
  return {
    type: GAME_STARTED,
    payload: {
      game: {
        id: gameId,
        state: gameState,
      },
    },
  };
}

export function startGame(gameId) {
  return dispatch => {
    dispatch({
      type: START_GAME,
      payload: { game: { id: gameId } },
      meta: {
        socket: started => {
          if (started) {
            dispatch(gameStarted(gameId, started.state));
          }
        },
      },
    });
  };
}

export function gameEnded(gameId) {
  return {
    type: GAME_ENDED,
    payload: {
      game: {
        id: gameId,
      },
    },
  };
}

export function gameCanceled(gameId) {
  return {
    type: GAME_CANCELED,
    payload: {
      game: {
        id: gameId,
      },
    },
  };
}

export function cancelGame(gameId) {
  return dispatch => {
    dispatch({
      type: CANCEL_GAME,
      payload: { game: { id: gameId } },
      meta: {
        socket: (err, canceled) => {
          if (!err && canceled) {
            dispatch(gameCanceled(gameId));
          }
        },
      },
    });
  };
}

export default {
  joinGame,
  playerJoined,
  leaveGame,
  playerLeft,
  enterRoom,
  leaveRoom,
  getGameData,
  startGame,
  cancelGame,
};
