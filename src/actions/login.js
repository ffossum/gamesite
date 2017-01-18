// @flow

export const LOG_IN_REQUEST = 'login/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'login/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'login/LOG_IN_FAILURE';
export const LOG_OUT = 'login/LOG_OUT';
export const UPDATE_FORM = 'login/UPDATE_FORM';

type LogInFormValues = {
  username: string,
  password: string,
  remember: boolean,
}

type OwnUserData = {
  id: string,
  username: string,
  email: string,
  emailHash: string,
}

export function updateForm(values: LogInFormValues) {
  return {
    type: UPDATE_FORM,
    payload: {
      values,
    },
  };
}

export function logInSuccess(user: OwnUserData) {
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

export function logIn({ username, password, remember }: LogInFormValues) {
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
