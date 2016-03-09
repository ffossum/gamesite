export const SEND_MESSAGE = 'mainChat/SEND_MESSAGE';
export const NEW_MESSAGE = 'mainChat/NEW_MESSAGE';

export function sendMessage(text) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.loggedInUser) {

      dispatch({
        type: SEND_MESSAGE,
        payload: {
          text
        },
        meta: {
          socket: true
        }
      });

      const user = state.data.users[state.loggedInUser];
      const message = {
        text,
        time: new Date().toJSON(),
        user: {
          emailHash: user.emailHash,
          username: user.username
        }
      };

      dispatch(newMessage(message));
    }
  };
}

export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    payload: message
  };
}

export default {
  sendMessage,
  newMessage
};
