import { LOG_IN_SUCCESS } from 'actions/login';
import { GET_USER_DATA } from 'actions/userData';

import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS: {
      const { user } = action.payload;
      const newState = Immutable.fromJS({
        [user.id]: user,
      });
      return state.merge(newState);
    }
    case GET_USER_DATA: {
      const newState = Immutable.fromJS(action.payload.users);
      return state.merge(newState);
    }
    default: return state;
  }
}
