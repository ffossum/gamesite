import {combineReducers} from 'redux-immutablejs';
import users from './users/usersReducer';

export default combineReducers({
  users
});
