// @flow
import type { Action } from 'actions/types';

import {
  LOG_IN_SUCCESS,
  LOG_OUT,
} from 'actions/login';

export type Session = {
  userId: ?string,
}

const initialState: Session = {
  userId: null,
};

export default function sessionReducer(state: Session = initialState, action: Action): Session {
  switch (action.type) {
    case LOG_IN_SUCCESS: return { ...state, userId: action.payload.user.id };
    case LOG_OUT: return initialState;

    default: return state;
  }
}
