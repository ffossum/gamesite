import {combineReducers} from 'redux';
import {routeReducer as routing} from 'react-router-redux';
import forms from './forms';
import loggedInUser from './loggedInUserReducer';
import data from './data/dataReducer';

export default combineReducers({
  routing,
  data,
  forms,
  loggedInUser
});
