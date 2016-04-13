import { getUserData } from './userData';

export const SEND_MESSAGE = 'mainChat/SEND_MESSAGE';
export const NEW_MESSAGE = 'mainChat/NEW_MESSAGE';

export function newMessage(message) {
  return dispatch => {
    dispatch(getUserData(message.user));
    dispatch({
      type: NEW_MESSAGE,
      payload: message,
    });
  };
}

export function sendMessage(text) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.getIn(['session', 'userId']);
    if (userId) {
      dispatch({
        type: SEND_MESSAGE,
        payload: {
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

      dispatch(newMessage(message));
    }
  };
}

export default {
  sendMessage,
  newMessage,
};
