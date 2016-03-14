import { LOG_IN_SUCCESS } from 'actions/login';
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
    default: return state;
  }
}
