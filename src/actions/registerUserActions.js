/* @flow */
import type { Action } from './types';

export const UPDATE_FORM = 'register user: update form';
export const REGISTER_USER_REQUEST = 'register user: request';
export const REGISTER_USER_FAILURE = 'register user: failure';

type RegisterUserFormValues = {
  email: string,
  username: string,
  password: string,
  repeatPassword: string,
  remember: boolean,
}

type UpdateFormValues = {
  email?: string,
  username?: string,
  password?: string,
  repeatPassword?: string,
  remember?: boolean,
}

type UpdateFormAction = {
  type: 'register user: update form',
  payload: {
    values: UpdateFormValues,
  }
}
type RegisterRequestAction = {
  type: 'register user: request',
  payload: RegisterUserFormValues,
}
type RegisterFailureAction = {
  type: 'register user: failure',
  payload: {
    errors: any,
  }
}
export type RegisterUserAction =
  | UpdateFormAction
  | RegisterRequestAction
  | RegisterFailureAction
  ;

export function updateForm(values: UpdateFormValues): Action {
  return {
    type: UPDATE_FORM,
    payload: {
      values,
    },
  };
}

export function registerUser(formData: RegisterUserFormValues): Action {
  return {
    type: REGISTER_USER_REQUEST,
    payload: formData,
  };
}

// TODO errors type
export function registerUserFailure(registrationErrors: any): Action {
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      errors: registrationErrors,
    },
  };
}

export default {
  registerUser,
  updateForm,
};
