/* @flow */
type RequestType = 'forgot/REQUEST';
type SuccessType = 'forgot/SUCCESS';
type FailureType = 'forgot/FAILURE';
type ClearType = 'forgot/CLEAR';
export const FORGOT_PASSWORD_REQUEST: RequestType = 'forgot/REQUEST';
export const FORGOT_PASSWORD_SUCCESS: SuccessType = 'forgot/SUCCESS';
export const FORGOT_PASSWORD_FAILURE: FailureType = 'forgot/FAILURE';
export const FORGOT_PASSWORD_CLEAR: ClearType = 'forgot/CLEAR';

import type { ErrorType } from 'constants/errorType';

type RequestAction = {
  type: RequestType,
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
  type: SuccessType,
}
export function forgotPasswordSuccess(): SuccessAction {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
}

type FailureAction = {
  type: FailureType,
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
  type: ClearType,
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
