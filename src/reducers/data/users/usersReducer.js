import { LOG_IN_SUCCESS } from 'actions/loginActions';
import { GET_USER_DATA_SUCCESS } from 'actions/userDataActions';

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        [user.id]: user,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload.users,
      };
    }
    default: return state;
  }
}
