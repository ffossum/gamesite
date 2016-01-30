import {combineReducers} from 'redux';
import {routeReducer as routing} from 'react-router-redux'
import forms from './forms';

export default combineReducers({
  routing,
  forms
});
