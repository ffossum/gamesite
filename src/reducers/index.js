// @flow

import { combineReducers } from 'redux';
import forms from './forms';
import session from './session/sessionReducer';
import data from './data/dataReducer';
import mainChat from './mainChat';
import modal from './modal/modalReducer';

import type { Reducer } from 'redux';
import type { Action } from 'actions/types';
import type { Session } from './session/sessionReducer';
import type { ModalState } from './modal/modalReducer';
import type { MainChatState } from './mainChat/';

export type State = {
  data: any,
  mainChat: MainChatState,
  forms: any,
  session: Session,
  modal: ModalState,
}

const reducer: Reducer<State, Action> = combineReducers({
  data,
  mainChat,
  forms,
  session,
  modal,
});

export default reducer;
