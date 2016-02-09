import {combineReducers} from 'redux';
import login from './loginFormReducer';
import registerUser from './registerUserFormReducer';

export default combineReducers({
  login,
  registerUser
});
