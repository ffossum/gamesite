// @flow

type UpdateFormType = 'register user: update form';
type RegisterRequestType = 'register user: request';
type RegisterFailureType = 'register user: failure';

export const UPDATE_FORM: UpdateFormType = 'register user: update form';
export const REGISTER_USER_REQUEST: RegisterRequestType = 'register user: request';
export const REGISTER_USER_FAILURE: RegisterFailureType = 'register user: failure';

type RegisterUserFormValues = {
  email: string,
  username: string,
  password: string,
  repeatPassword: string,
  remember: boolean,
}

type UpdateFormAction = {
  type: UpdateFormType,
  payload: {
    values: RegisterUserFormValues,
  }
}
type RegisterRequestAction = {
  type: RegisterRequestType,
  payload: RegisterUserFormValues,
}
type RegisterFailureAction = {
  type: RegisterFailureType,
  payload: {
    errors: any,
  }
}
export type RegisterUserAction =
  | UpdateFormAction
  | RegisterRequestAction
  | RegisterFailureAction
  ;

export function updateForm(values: RegisterUserFormValues): UpdateFormAction {
  return {
    type: UPDATE_FORM,
    payload: {
      values,
    },
  };
}

export function registerUser(formData: RegisterUserFormValues): RegisterRequestAction {
  return {
    type: REGISTER_USER_REQUEST,
    payload: formData,
  };
}

// TODO errors type
export function registerUserFailure(registrationErrors: any): RegisterFailureAction {
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
