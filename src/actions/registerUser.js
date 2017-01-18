// @flow
import type { Action } from 'actions/types';

export const REGISTER_USER_REQUEST = 'registerUser/REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILURE = 'registerUser/REGISTER_USER_FAILURE';
export const UPDATE_FORM = 'registerUser/UPDATE_FORM';

type RegisterUserFormValues = {
  email: string,
  username: string,
  password: string,
  repeatPassword: string,
  remember: boolean,
}

export function updateForm(values: RegisterUserFormValues): Action {
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
