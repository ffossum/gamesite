import fetch from 'isomorphic-fetch';
import { getUserData } from './userData';
import {
  union,
  reduce,
} from 'lodash';

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

export function logInSuccess(user, games) {
  if (!games) {
    return {
      type: LOG_IN_SUCCESS,
      payload: { user, games: {} },
    };
  }

  return dispatch => {
    const users = reduce(games, (result, game) => union(result, game.users), []);
    dispatch(getUserData(...users));
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: {
        user,
        games,
      },
    });
  };
}

function logInFailure() {
  return {
    type: LOG_IN_FAILURE,
  };
}

export function logOutRequest() {
  return {
    type: LOG_OUT,
  };
}

export function logIn({ username, password, remember }) {
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
        remember,
      }),
    })
    .then(res => {
      if (res.ok) {
        location.reload();
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
    })
    .then(() => {
      location.reload();
    });
  };
}

export default {
  updateForm,
  logIn,
  logOut,
};
