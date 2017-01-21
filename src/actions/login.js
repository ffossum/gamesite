// @flow
import type { Action } from './types';

type LoginRequestType = 'login: request';
type LoginSuccessType = 'login: success';
type LoginFailureType = 'login: failure';
type LogoutType = 'logout';
type UpdateFormType = 'login: update form';

export const LOG_IN_REQUEST: LoginRequestType = 'login: request';
export const LOG_IN_SUCCESS: LoginSuccessType = 'login: success';
export const LOG_IN_FAILURE: LoginFailureType = 'login: failure';
export const LOG_OUT: LogoutType = 'logout';
export const UPDATE_FORM: UpdateFormType = 'login: update form';

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
  type: UpdateFormType,
  payload: {
    values: LogInFormValues,
  }
}
type LogInSuccessAction = {
  type: LoginSuccessType,
  payload: {
    user: OwnUserData,
  }
}
type LogInFailureAction = {
  type: LoginFailureType,
}
type LogOutAction = {
  type: LogoutType,
}
type LogInRequestAction = {
  type: LoginRequestType,
  payload: LogInFormValues,
}
export type LoginAction =
  | UpdateLoginFormAction
  | LogInSuccessAction
  | LogInFailureAction
  | LogOutAction
  | LogInRequestAction
  ;

export function updateForm(values: LogInFormValues): Action {
  return {
    type: UPDATE_FORM,
    payload: {
      values,
    },
  };
}

export function logInSuccess(user: OwnUserData): Action {
  return {
    type: LOG_IN_SUCCESS,
    payload: { user },
  };
}

export function logInFailure(): Action {
  return {
    type: LOG_IN_FAILURE,
  };
}

export function logOut(): Action {
  return {
    type: LOG_OUT,
  };
}

export function logIn(values: LogInFormValues): Action {
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
