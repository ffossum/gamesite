import fetch from 'isomorphic-fetch';

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
  UPDATE_FORM
};

export function updateForm(values) {
  return {
    type: UPDATE_FORM,
    payload: {
      values
    }
  };
}

function logInRequest() {
  return {
    type: LOG_IN_REQUEST
  };
}

export function logInSuccess(userId) {
  return {
    type: LOG_IN_SUCCESS,
    payload: {
      userId
    }
  };
}

function logInFailure() {
  return {
    type: LOG_IN_FAILURE
  };
}

export function logIn(username, password) {
  return dispatch => {
    dispatch(logInRequest());
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
    .then(async res => {
      if (res.ok) {
        const json = await res.json();
        dispatch(logInSuccess(json.userId));
      } else {
        dispatch(logInFailure());
      }
    });
  };
}

export function logOut() {
  return dispatch => {
    dispatch({type: LOG_OUT});
    fetch('/api/logout', {
      method: 'post',
      credentials: 'same-origin'
    });
  };
}

export default {
  updateForm,
  logIn,
  logOut
};
