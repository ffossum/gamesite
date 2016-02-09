import {types as login} from 'actions/login';
import {types} from 'actions/registerUser';

const initialState = {
  errors: {},
  pending: false,
  username: '',
  password: '',
  repeatPassword: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FORM: {
      return {
        ...state,
        ...action.payload.values
      };
    }
    case types.REGISTER_USER_REQUEST: {
      return {
        ...state,
        errors: {},
        pending: true
      };
    }
    case types.REGISTER_USER_FAILURE: {
      return {
        ...state,
        errors: action.payload.errors,
        pending: false
      };
    }
    case login.LOG_IN_SUCCESS:
      return initialState;

    default: return state;
  }
}
