import { getUserData } from './userData';

export const SEND_GAME_MESSAGE = 'gameChat/SEND_MSG';
export const NEW_MESSAGE = 'gameChat/NEW_MSG';

export function newGameMessage(gameId, message) {
  return dispatch => {
    dispatch(getUserData(message.user));
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        gameId,
        message,
      },
    });
  };
}

export function sendGameMessage(gameId, text) {
  return (dispatch, getState) => {
    const state = getState();
    const loggedInUser = state.get('loggedInUser');
    if (loggedInUser) {
      dispatch({
        type: SEND_GAME_MESSAGE,
        payload: {
          gameId,
          text,
        },
        meta: {
          socket: true,
        },
      });

      const user = state.getIn(['data', 'users', loggedInUser]);
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
