import {LOG_IN_SUCCESS} from 'actions/login';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS: {
      const {user} = action.payload;
      return {
        ...state,
        [user.id]: user
      }
    }
    default: return state;
  }
}
