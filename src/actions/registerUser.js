import {logInSuccess} from './login';

export const REGISTER_USER_REQUEST = 'registerUser/REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILURE = 'registerUser/REGISTER_USER_FAILURE';
export const UPDATE_FORM = 'registerUser/UPDATE_FORM';

export const types = {
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
  UPDATE_FORM
};

const USERNAME_TAKEN = 'registerUser/USERNAME_TAKEN';
const PASSWORDS_DO_NOT_MATCH = 'registerUser/PASSWORDS_DO_NOT_MATCH';

export const errors = {
  USERNAME_TAKEN,
  PASSWORDS_DO_NOT_MATCH
};

export function updateForm(values) {
  return {
    type: UPDATE_FORM,
    payload: {
      values
    }
  };
}

export function registerUser(username, password, repeatPassword) {
  return dispatch => {
    if (password !== repeatPassword) {
      const errors = {
        repeatPassword: PASSWORDS_DO_NOT_MATCH,
      };
      dispatch(registerUserFailure(errors));
    } else {
      dispatch(registerUserRequest());
      fetch('/api/register', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({username, password})
      })
      .then(async res => {
        const json = await res.json();
        if (res.ok) {
          dispatch(logInSuccess(json.userId));
        } else {
          dispatch(registerUserFailure(json.errors));
        }
      });
    }
  };
}

function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST
  };
}

function registerUserFailure(errors) {
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      errors
    }
  };
}

export default {
  registerUser,
  updateForm
};
