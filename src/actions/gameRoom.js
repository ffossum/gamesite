import { getUserData } from './userData';

export const JOIN_GAME = 'gameRoom/JOIN_GAME';
export const JOIN_GAME_SUCCESS = 'gameRoom/JOIN_GAME_SUCCESS';
export const PLAYER_JOINED = 'gameRoom/PLAYER_JOINED';
export const LEAVE_GAME = 'gameRoom/LEAVE_GAME';

export const ENTER_ROOM = 'gameRoom/ENTER_ROOM';
export const LEAVE_ROOM = 'gameRoom/LEAVE_ROOM';
export const REFRESH_GAME = 'gameRoom/REFRESH';

export function enterRoom(gameId) {
  return {
    type: ENTER_ROOM,
    payload: gameId,
    meta: {
      socket: true,
    },
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

export function playerJoined(gameId, userId) {
  return {
    type: PLAYER_JOINED,
    payload: {
      game: { id: gameId },
      user: { id: userId },
    },
  };
}

function joinGameSuccess(gameId, userId) {
  return {
    type: JOIN_GAME_SUCCESS,
    payload: {
      game: { id: gameId },
      user: { id: userId },
    },
  };
}

export function joinGame(gameId) {
  return (dispatch, getState) => {
    const userId = getState().get('loggedInUser');
    if (!userId) {
      return;
    }

    dispatch({
      type: JOIN_GAME,
      payload: {
        game: {
          id: gameId,
        },
      },
      meta: {
        socket: joined => {
          if (joined) {
            dispatch(joinGameSuccess(gameId, userId));
          }
        },
      },
    });
  };
}

export default {
  joinGame,
  playerJoined,
  enterRoom,
  leaveRoom,
};
