import { types } from 'actions/login';

const initialState = {
  pending: false,
  error: false,
  username: '',
  password: '',
};

export default function loginFormReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FORM: {
      const newState = action.payload.values;
      return {
        ...state,
        ...newState,
      };
    }
    case types.LOG_IN_REQUEST: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case types.LOG_IN_FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }

    case types.LOG_IN_SUCCESS: return initialState;
    default: return state;
  }
}
