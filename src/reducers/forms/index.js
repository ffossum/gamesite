import { combineReducers } from 'redux';
import login from './loginFormReducer';
import registerUser from './registerUserFormReducer';
import forgotPassword from './forgotPasswordFormReducer';

export default combineReducers({
  forgotPassword,
  login,
  registerUser,
});
