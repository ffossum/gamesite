export const SEND_MESSAGE = 'mainChat/SEND_MESSAGE';
export const NEW_MESSAGE = 'mainChat/NEW_MESSAGE';
export const RESET_MESSAGES = 'mainChat/RESET';

export function newMessage({ user, text }) {
  const time = new Date().toJSON();

  const message = {
    user: user.id,
    time,
    text,
  };

  return {
    type: NEW_MESSAGE,
    payload: message,
  };
}

export function sendMessage(text) {
  return {
    type: SEND_MESSAGE,
    payload: {
      text,
    },
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
