import {combineReducers} from 'redux';
import {routeReducer as routing} from 'react-router-redux';
import forms from './forms';
import loggedInUser from './loggedInUserReducer';

export default combineReducers({
  routing,
  forms,
  loggedInUser
});
