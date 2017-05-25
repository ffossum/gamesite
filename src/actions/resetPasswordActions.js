export const RESET_PASSWORD_REQUEST = 'reset/REQUEST';
export const RESET_PASSWORD_SUCCESS = 'reset/SUCCESS';
export const RESET_PASSWORD_FAILURE = 'reset/FAILURE';

export function resetPassword({ userId, token, password, repeatPassword }) {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: {
      userId,
      token,
      password,
      repeatPassword,
    },
  };
}

export function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
}

export function resetPasswordFailure(errors = {}) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: errors,
  };
}

export default {
  resetPassword,
};
