import { types } from 'actions/login';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  pending: false,
  error: false,
  username: '',
  password: '',
});
export default function loginFormReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FORM: {
      const newState = Immutable.fromJS(action.payload.values);
      return state.merge(newState);
    }
    case types.LOG_IN_REQUEST: {
      return state.merge({ pending: true, error: false });
    }
    case types.LOG_IN_FAILURE: {
      return state.merge({ pending: false, error: true });
    }

    case types.LOG_IN_SUCCESS: return initialState;
    default: return state;
  }
}
