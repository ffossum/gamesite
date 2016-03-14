import { types } from 'actions/login';

const initialState = null;
export default function loggedInUserReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS: return action.payload.user.id;
    case types.LOG_OUT: return initialState;
    default: return state;
  }
}
