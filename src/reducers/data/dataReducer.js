/* @flow */
import { combineReducers } from 'redux';
import games from './games/gamesReducer';
import users from './users/usersReducer';

export default combineReducers({
  games,
  users,
});
