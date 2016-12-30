export const SEND_GAME_MESSAGE = 'gameChat/SEND_MSG';
export const NEW_GAME_MESSAGE = 'gameChat/NEW_MSG';
export const CLEAR_CHAT = 'gameChat/CLEAR_CHAT';

export function newGameMessage({ user, game, text }) {
  const time = new Date().toJSON();

  const message = {
    user: user.id,
    time,
    text,
  };

  return {
    type: NEW_GAME_MESSAGE,
    payload: {
      game,
      message,
    },
  };
}

export function sendGameMessage(gameId, text) {
  return {
    type: SEND_GAME_MESSAGE,
    payload: {
      game: { id: gameId },
      text,
    },
  };
}

export function clearChat(gameId) {
  return {
    type: CLEAR_CHAT,
    payload: { game: { id: gameId } },
  };
}

export default {
  sendGameMessage,
  newGameMessage,
};
