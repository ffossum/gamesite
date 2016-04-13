import { getUserData } from './userData';

export const SEND_GAME_MESSAGE = 'gameChat/SEND_MSG';
export const NEW_GAME_MESSAGE = 'gameChat/NEW_MSG';

export function newGameMessage(gameId, message) {
  return dispatch => {
    dispatch(getUserData(message.user));
    dispatch({
      type: NEW_GAME_MESSAGE,
      payload: {
        game: { id: gameId },
        message,
      },
    });
  };
}

export function sendGameMessage(gameId, text) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.getIn(['session', 'userId']);
    if (userId) {
      dispatch({
        type: SEND_GAME_MESSAGE,
        payload: {
          game: { id: gameId },
          text,
        },
        meta: {
          socket: true,
        },
      });

      const user = state.getIn(['data', 'users', userId]);
      const message = {
        text,
        time: new Date().toJSON(),
        user: user.get('id'),
      };

      dispatch(newGameMessage(gameId, message));
    }
  };
}

export default {
  sendGameMessage,
  newGameMessage,
};
