// @flow
import type { Action } from 'actions/types';

import {
  UPDATE_FORM,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
 } from 'actions/loginActions';

type LoginFormState = {
  pending: boolean,
  error: boolean,
  username: string,
  password: string,
  remember: boolean,
}

const initialState: LoginFormState = {
  pending: false,
  error: false,
  username: '',
  password: '',
  remember: false,
};

export default function loginFormReducer(state: LoginFormState = initialState, action: Action) {
  switch (action.type) {
    case UPDATE_FORM: {
      const newState = action.payload.values;
      return {
        ...state,
        ...newState,
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }

    default: return state;
  }
}
