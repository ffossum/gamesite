/* @flow */
import type { Action } from 'actions/types';

export const SEND_MESSAGE = 'main chat: send message';
export const NEW_MESSAGE = 'main chat: new message';
export const RESET_MESSAGES = 'main chat: reset messages';

type NewMessageAction = {
  type: 'main chat: new message',
  payload: UserMessage,
}
type SendMessageAction = {
  type: 'main chat: send message',
  payload: { text: string },
}
type ResetMessagesAction = {
  type: 'main chat: reset messages',
  payload: UserMessage[],
}
export type MainChatAction =
  | NewMessageAction
  | SendMessageAction
  | ResetMessagesAction
  ;

type UserData = {
  id: string,
}
type NewMessageData = {
  user: UserData,
  text: string,
};
export function newMessage({ user, text }: NewMessageData): Action {
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

export function sendMessage(text: string): Action {
  return {
    type: SEND_MESSAGE,
    payload: {
      text,
    },
  };
}

export function resetMessages(messages: UserMessage[] = []): Action {
  return {
    type: RESET_MESSAGES,
    payload: messages,
  };
}

export default {
  sendMessage,
  newMessage,
};
