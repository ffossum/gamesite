export const REGISTER_USER_REQUEST = 'registerUser/REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILURE = 'registerUser/REGISTER_USER_FAILURE';
export const UPDATE_FORM = 'registerUser/UPDATE_FORM';

export const types = {
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
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
