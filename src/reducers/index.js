import { combineReducers } from 'redux-immutablejs';
import { routerReducer as routing } from 'react-router-redux';
import forms from './forms';
import session from './session/sessionReducer';
import data from './data/dataReducer';
import mainChat from './mainChat';

export default combineReducers({
  routing,
  data,
  mainChat,
  forms,
  session,
});
