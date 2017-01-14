import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from 'actions/resetPasswordActions';

const empty = Object.freeze({});
const initialState = {
  success: false,
  pending: false,
  errors: empty,
};

export default function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        success: false,
        pending: true,
        errors: empty,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        success: true,
        pending: false,
        errors: empty,
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        success: false,
        pending: false,
        errors: action.payload,
      };
    }
    default: return state;
  }
}
