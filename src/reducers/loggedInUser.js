import {types} from 'actions/login';

const initialState = null;
export default function(state = initialState, action) {
  switch(action.type) {
    case types.LOGGED_IN: return action.payload.userId;
    case types.LOGGED_OUT: return initialState;
    default: return state;
  }
}
