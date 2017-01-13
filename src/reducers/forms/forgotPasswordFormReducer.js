import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_CLEAR,
 } from 'actions/forgotPasswordActions';

const empty = Object.freeze({});

const initialState = {
  pending: false,
  errors: empty,
  success: false,
};

export default function forgotPasswordFormReducer(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        pending: true,
        success: false,
        errors: empty,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        pending: false,
        success: true,
        errors: empty,
      };
    }
    case FORGOT_PASSWORD_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state,
        pending: false,
        success: false,
        errors,
      };
    }
    case FORGOT_PASSWORD_CLEAR: return initialState;

    default: return state;
  }
}
