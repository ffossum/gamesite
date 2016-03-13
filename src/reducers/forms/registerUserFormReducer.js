import {types as login} from 'actions/login';
import {types} from 'actions/registerUser';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  errors: {},
  pending: false,
  email: '',
  username: '',
  password: '',
  repeatPassword: ''
});

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FORM: {
      const newState = Immutable.fromJS(action.payload.values);
      return state.merge(newState);
    }
    case types.REGISTER_USER_REQUEST: {
      const newState = Immutable.fromJS({
        errors: {},
        pending: true
      });
      return state.merge(newState);
    }
    case types.REGISTER_USER_FAILURE: {
      const newState = Immutable.fromJS({
        errors: action.payload.errors,
        pending: false
      });
      return state.merge(newState);
    }
    case login.LOG_IN_SUCCESS:
      return initialState;

    default: return state;
  }
}
