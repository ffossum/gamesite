import { types } from 'actions/registerUser';

const initialState = {
  errors: {},
  pending: false,
  email: '',
  username: '',
  password: '',
  repeatPassword: '',
  remember: false,
};

export default function registerUserFormReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FORM: {
      const newState = action.payload.values;
      return {
        ...state,
        ...newState,
      };
    }
    case types.REGISTER_USER_REQUEST: {
      return {
        ...state,
        errors: {},
        pending: true,
      };
    }
    case types.REGISTER_USER_FAILURE: {
      return {
        ...state,
        errors: action.payload.errors,
        pending: false,
      };
    }

    default: return state;
  }
}
