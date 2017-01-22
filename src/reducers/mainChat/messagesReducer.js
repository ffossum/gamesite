// @flow
import {
  NEW_MESSAGE,
  RESET_MESSAGES,
} from 'actions/mainChat';
import type { Action } from 'actions/types';
import type { Reducer } from 'redux';

export type UserMessage = {
  user: string,
  time: string,
  text: string,
}
export type MessagesState = UserMessage[];

const initialState: MessagesState = [];
const messagesReducer: Reducer<MessagesState, Action> = (state = initialState, action) => {
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
