/* @flow */
export const LOG_IN_REQUEST = 'login: request';
export const LOG_IN_SUCCESS = 'login: success';
export const LOG_IN_FAILURE = 'login: failure';
export const LOG_OUT = 'logout';
export const UPDATE_FORM = 'login: update form';

type LogInFormValues = {
  username: string,
  password: string,
  remember: boolean,
}

type OwnUserData = {
  id: string,
  username?: string,
  email?: string,
  emailHash?: string,
}

type UpdateLoginFormAction = {
  type: 'login: update form',
  payload: {
    values: LogInFormValues,
  }
}
type LogInSuccessAction = {
  type: 'login: success',
  payload: {
    user: OwnUserData,
  }
}
type LogInFailureAction = {
  type: 'login: failure',
}
type LogOutAction = {
  type: 'logout',
}
type LogInRequestAction = {
  type: 'login: request',
  payload: LogInFormValues,
}
export type LoginAction =
  | UpdateLoginFormAction
  | LogInSuccessAction
  | LogInFailureAction
  | LogOutAction
  | LogInRequestAction
  ;

export function updateForm(values: LogInFormValues): UpdateLoginFormAction {
  return {
    type: UPDATE_FORM,
    payload: {
      values,
    },
  };
}

export function logInSuccess(user: OwnUserData): LogInSuccessAction {
  return {
    type: LOG_IN_SUCCESS,
    payload: { user },
  };
}

export function logInFailure(): LogInFailureAction {
  return {
    type: LOG_IN_FAILURE,
  };
}

export function logOut(): LogOutAction {
  return {
    type: LOG_OUT,
  };
}

export function logIn(values: LogInFormValues): LogInRequestAction {
  return {
    type: LOG_IN_REQUEST,
    payload: values,
  };
}

export default {
  updateForm,
  logIn,
  logOut,
};
