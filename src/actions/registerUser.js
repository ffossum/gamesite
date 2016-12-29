export const REGISTER_USER_REQUEST = 'registerUser/REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILURE = 'registerUser/REGISTER_USER_FAILURE';
export const UPDATE_FORM = 'registerUser/UPDATE_FORM';

export const types = {
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
  UPDATE_FORM,
};

const USERNAME_TAKEN = 'registerUser/USERNAME_TAKEN';
const PASSWORDS_DO_NOT_MATCH = 'registerUser/PASSWORDS_DO_NOT_MATCH';
const INVALID_EMAIL = 'registerUser/INVALID_EMAIL';
const EMAIL_TAKEN = 'registerUser/EMAIL_TAKEN';

export const errors = {
  USERNAME_TAKEN,
  PASSWORDS_DO_NOT_MATCH,
  INVALID_EMAIL,
  EMAIL_TAKEN,
};

export function updateForm(values) {
  return {
    type: UPDATE_FORM,
    payload: {
      values,
    },
  };
}

export function registerUser(formData) {
  return {
    type: REGISTER_USER_REQUEST,
    payload: formData,
  };
}

export function registerUserFailure(registrationErrors) {
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
