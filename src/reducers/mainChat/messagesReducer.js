// @flow
import {
  NEW_MESSAGE,
  RESET_MESSAGES,
} from 'actions/mainChatActions';
import type { Action } from 'actions/types';

export type MessagesState = UserMessage[];

const initialState: MessagesState = [];
const messagesReducer: (s?: MessagesState, a: Action) => MessagesState = (state = initialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE: {
      const newMessage = action.payload;
      return [
        ...state,
        newMessage,
      ];
    }

    case RESET_MESSAGES: {
      const newMessages = action.payload;
      return newMessages;
    }

    default:
      return state;
  }
};

export default messagesReducer;
