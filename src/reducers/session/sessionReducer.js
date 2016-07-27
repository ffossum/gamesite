import {
  LOG_IN_SUCCESS,
  LOG_OUT,
} from 'actions/login';

const initialState = {
  userId: null,
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS: return { ...state, userId: action.payload.user.id };
    case LOG_OUT: return initialState;

    default: return state;
  }
}
