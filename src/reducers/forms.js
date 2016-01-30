import {combineReducers} from 'redux';
import {createModelReducer, createFormReducer} from 'react-redux-form';

export default combineReducers({
  user: createModelReducer('user'),
  userForm: createFormReducer('user')
});
