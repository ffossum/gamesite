import fetch from 'isomorphic-fetch';
import {actions as formActions} from 'react-redux-form';
const {setPending, setValidity, reset} = formActions;

export const AUTHENTICATE = 'login/authenticate';

export const types = {
  AUTHENTICATE
}

function loginRequest() {
  return dispatch => {
    dispatch(setValidity('user', true));
    dispatch(setPending('user'));
  }
}

function loginSuccess(userId) {
  return dispatch => {
    dispatch(reset('user'));
  }
}

function loginFailed() {
  return dispatch => {
    dispatch(setPending('user', false));
    dispatch(setValidity('user', {authorized: false}));
  }
}

export function authenticate(username, password) {
  return dispatch => {
    dispatch(loginRequest());
    fetch('/api/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => {
      if (res.ok) {
        dispatch(loginSuccess());
      } else {
        dispatch(loginFailed());
      }
    });
  };
}

export default {
  authenticate
}
