import {combineReducers} from 'redux';
import {routeReducer as routing} from 'react-router-redux'
import loggedInUser from './loggedInUser';

export default combineReducers({
  routing,
  loggedInUser
});
