import {types} from 'actions/login';

const initialState = null;
export default function(state = initialState, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS: return action.payload.userId;
    case types.LOG_OUT: return initialState;
    default: return state;
  }
}
