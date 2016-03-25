export const JOIN_GAME = 'gameRoom/JOIN_GAME';
export const JOIN_GAME_SUCCESS = 'gameRoom/JOIN_GAME_SUCCESS';
export const PLAYER_JOINED = 'gameRoom/PLAYER_JOINED';

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
};
