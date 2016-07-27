import { combineReducers } from 'redux-immutablejs';
import { routerReducer as routing } from 'react-router-redux';
import forms from './forms';
import session from './session/sessionReducer';
import data from './data/dataReducer';
import mainChat from './mainChat';
import modal from './modal';
import lobby from './lobby/lobbyReducer';

export default combineReducers({
  routing,
  data,
  mainChat,
  lobby,
  forms,
  session,
  modal,
});
