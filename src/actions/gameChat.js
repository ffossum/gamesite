/* @flow */
type SendGameMessageType = 'gameChat/SEND_MSG';
type NewGameMessageType = 'gameChat/NEW_MSG';
type ClearChatType = 'gameChat/CLEAR_CHAT';
export const SEND_GAME_MESSAGE: SendGameMessageType = 'gameChat/SEND_MSG';
export const NEW_GAME_MESSAGE: NewGameMessageType = 'gameChat/NEW_MSG';
export const CLEAR_CHAT: ClearChatType = 'gameChat/CLEAR_CHAT';

type SendMessagePayload = {
  game: GameWithId,
  text: string,
}
type NewGameMessageData = SendMessagePayload & {
  user: UserWithId,
}

type NewGameMessageAction = {
  type: NewGameMessageType,
  payload: {
    game: GameWithId,
    message: UserMessage,
  }
}
export function newGameMessage({ user, game, text }: NewGameMessageData): NewGameMessageAction {
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

type SendGameMessageAction = {
  type: SendGameMessageType,
  payload: {
    game: GameWithId,
    text: string,
  },
}
export function sendGameMessage(gameId: string, text: string): SendGameMessageAction {
  return {
    type: SEND_GAME_MESSAGE,
    payload: {
      game: { id: gameId },
      text,
    },
  };
}

type ClearChatAction = {
  type: ClearChatType,
  payload: {
    game: GameWithId,
  },
}
export function clearChat(gameId: string): ClearChatAction {
  return {
    type: CLEAR_CHAT,
    payload: { game: { id: gameId } },
  };
}

export type GameChatAction =
 | NewGameMessageAction
 | SendGameMessageAction
 | ClearChatAction
 ;

export default {
  sendGameMessage,
  newGameMessage,
};
