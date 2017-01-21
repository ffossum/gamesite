// @flow

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import forms from './forms';
import session from './session/sessionReducer';
import data from './data/dataReducer';
import mainChat from './mainChat';
import modal from './modal';
import lobby from './lobby/lobbyReducer';

import type { Action } from 'actions/types';
import type { Session } from './session/sessionReducer';
import type { ModalState } from './modal/';

export type State = {
  routing: any,
  data: any,
  mainChat: any,
  lobby: any,
  forms: any,
  session: Session,
  modal: ModalState,
}

const reducer: (state: State, action: Action) => State = combineReducers({
  routing,
  data,
  mainChat,
  lobby,
  forms,
  session,
  modal,
});

export default reducer;
