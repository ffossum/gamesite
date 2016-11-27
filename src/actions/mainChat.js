import { getUserData } from './userData';
import { get } from 'lodash';

export const SEND_MESSAGE = 'mainChat/SEND_MESSAGE';
export const NEW_MESSAGE = 'mainChat/NEW_MESSAGE';
export const RESET_MESSAGES = 'mainChat/RESET';

export function newMessage(message) {
  const time = new Date().toJSON();

  return dispatch => {
    dispatch(getUserData(message.user));
    dispatch({
      type: NEW_MESSAGE,
      payload: {
        ...message,
        time,
      },
    });
  };
}

export function sendMessage(text) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = get(state, ['session', 'userId']);
    if (userId) {
      dispatch({
        type: SEND_MESSAGE,
        payload: {
          user: userId,
          text,
        },
        meta: {
          deepstream: {
            event: 'mainchat',
          },
        },
      });
    }
  };
}

export function resetMessages(messages = []) {
  return {
    type: RESET_MESSAGES,
    payload: messages,
  };
}

export default {
  sendMessage,
  newMessage,
};
