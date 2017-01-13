export const FORGOT_PASSWORD_REQUEST = 'forgot/REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'forgot/SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'forgot/FAILURE';
export const FORGOT_PASSWORD_CLEAR = 'forgot/CLEAR';

export function forgotPassword(email) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: {
      email,
    },
  };
}
export function forgotPasswordSuccess() {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
}

export function forgotPasswordFailure(errors) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    payload: {
      errors,
    },
  };
}

export function clearForm() {
  return {
    type: FORGOT_PASSWORD_CLEAR,
  };
}

export default {
  clearForm,
  forgotPassword,
};
