/* @flow */
export const FORGOT_PASSWORD_REQUEST = 'forgot/REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'forgot/SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'forgot/FAILURE';
export const FORGOT_PASSWORD_CLEAR = 'forgot/CLEAR';

import type { ErrorType } from 'constants/errorType';

type RequestAction = {
  type: 'forgot/REQUEST',
  payload: {
    email: string,
  }
}
export function forgotPassword(email: string): RequestAction {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: {
      email,
    },
  };
}

type SuccessAction = {
  type: 'forgot/SUCCESS',
}
export function forgotPasswordSuccess(): SuccessAction {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
}

type FailureAction = {
  type: 'forgot/FAILURE',
  payload: {
    errors: {
      [key: string]: ErrorType
    }
  }
}
export function forgotPasswordFailure(errors: { [key: string]: ErrorType }): FailureAction {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: {
      errors,
    },
  };
}

type ClearAction = {
  type: 'forgot/CLEAR',
}
export function clearForm(): ClearAction {
  return {
    type: FORGOT_PASSWORD_CLEAR,
  };
}

export type ForgotPasswordAction =
 | RequestAction
 | SuccessAction
 | FailureAction
 | ClearAction
 ;

export default {
  clearForm,
  forgotPassword,
};
