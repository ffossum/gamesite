import {combineReducers} from 'redux-immutablejs';
import login from './loginFormReducer';
import registerUser from './registerUserFormReducer';

export default combineReducers({
  login,
  registerUser
});
