// @flow
import { combineReducers } from 'redux';
import messages from './messagesReducer';
import type { MessagesState } from './messagesReducer';
import type { Action } from 'actions/types';
import type { Reducer } from 'redux';

export type MainChatState = {
  messages: MessagesState,
};

const reducer: Reducer<MainChatState, Action> = combineReducers({
  messages,
});

export default reducer;
