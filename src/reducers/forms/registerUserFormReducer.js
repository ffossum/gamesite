// @flow
import type { Action } from 'actions/types';

import {
  UPDATE_FORM,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
} from 'actions/registerUser';

type RegisterUserFormState = {
  errors: any,
  pending: boolean,
  email: string,
  username: string,
  password: string,
  repeatPassword: string,
  remember: boolean,
}

const initialState: RegisterUserFormState = {
  errors: {},
  pending: false,
  email: '',
  username: '',
  password: '',
  repeatPassword: '',
  remember: false,
};

export default function registerUserFormReducer(
  state: RegisterUserFormState = initialState,
  action: Action
) {
  switch (action.type) {
    case UPDATE_FORM: {
      const newState = action.payload.values;
      return {
        ...state,
        ...newState,
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        errors: {},
        pending: true,
      };
    }
    case REGISTER_USER_FAILURE: {
      return {
        ...state,
        errors: action.payload.errors,
        pending: false,
      };
    }

    default: return state;
  }
}
