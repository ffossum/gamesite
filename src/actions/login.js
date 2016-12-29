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

export function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    payload: { user },
  };
}

export function logInFailure() {
  return {
    type: LOG_IN_FAILURE,
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}

export function logIn({ username, password, remember }) {
  return {
    type: LOG_IN_REQUEST,
    payload: {
      username,
      password,
      remember,
    },
  };
}

export default {
  updateForm,
  logIn,
  logOut,
};
