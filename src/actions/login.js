import fetch from 'isomorphic-fetch';
import socket from 'client/socket';

export const LOG_IN_REQUEST = 'login/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'login/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'login/LOG_IN_FAILURE';
export const LOG_OUT = 'login/LOG_OUT';
export const UPDATE_FORM = 'login/UPDATE_FORM';

export const types = {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  UPDATE_FORM,
};

export function updateForm(values) {
  return {
    type: UPDATE_FORM,
    payload: {
      values,
    },
  };
}

function logInRequest() {
  return {
    type: LOG_IN_REQUEST,
  };
}

export function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    payload: {
      user,
    },
  };
}

function logInFailure() {
  return {
    type: LOG_IN_FAILURE,
  };
}

function logOutRequest() {
  return {
    type: LOG_OUT,
    meta: {
      socket: true,
    },
  };
}

export function logIn(username, password) {
  return dispatch => {
    dispatch(logInRequest());
    fetch('/api/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then(async res => {
      if (res.ok) {
        socket.reconnect();
      } else {
        dispatch(logInFailure());
      }
    });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(logOutRequest());
    fetch('/api/logout', {
      method: 'post',
      credentials: 'same-origin',
    });
  };
}

export default {
  updateForm,
  logIn,
  logOut,
};
