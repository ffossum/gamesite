import { combineReducers } from 'redux-immutablejs';
import { routerReducer as routing } from 'react-router-redux';
import forms from './forms';
import loggedInUser from './loggedInUserReducer';
import data from './data/dataReducer';
import mainChat from './mainChat';
import games from './games/gamesReducer';

export default combineReducers({
  routing,
  data,
  mainChat,
  forms,
  games,
  loggedInUser,
});
