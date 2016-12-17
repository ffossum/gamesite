import validator from 'validator';
import _ from 'lodash';

export const REGISTER_USER_REQUEST = 'registerUser/REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILURE = 'registerUser/REGISTER_USER_FAILURE';
export const UPDATE_FORM = 'registerUser/UPDATE_FORM';

export const types = {
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
  UPDATE_FORM,
};

const USERNAME_TAKEN = 'registerUser/USERNAME_TAKEN';
const PASSWORDS_DO_NOT_MATCH = 'registerUser/PASSWORDS_DO_NOT_MATCH';
const INVALID_EMAIL = 'registerUser/INVALID_EMAIL';
const EMAIL_TAKEN = 'registerUser/EMAIL_TAKEN';

export const errors = {
  USERNAME_TAKEN,
  PASSWORDS_DO_NOT_MATCH,
  INVALID_EMAIL,
  EMAIL_TAKEN,
};

export function updateForm(values) {
  return {
    type: UPDATE_FORM,
    payload: {
      values,
    },
  };
}

function registerUserRequest() {
  return {
    type: REGISTER_USER_REQUEST,
  };
}

function registerUserFailure(registrationErrors) {
  return {
    type: REGISTER_USER_FAILURE,
    payload: {
      errors: registrationErrors,
    },
  };
}

export function registerUser({
    email,
    username,
    password,
    repeatPassword,
    remember,
  }) {
  return dispatch => {
    const registrationErrors = {};
    if (password !== repeatPassword) {
      registrationErrors.repeatPassword = PASSWORDS_DO_NOT_MATCH;
    }
    if (!validator.isEmail(email)) {
      registrationErrors.email = INVALID_EMAIL;
    }

    if (!_.isEmpty(registrationErrors)) {
      dispatch(registerUserFailure(registrationErrors));
    } else {
      dispatch(registerUserRequest());
      fetch('/api/register', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          email,
          username,
          password,
          remember,
        }),
      })
      .then(res => {
        res.json().then(json => {
          if (res.ok) {
            location.reload();
          } else {
            dispatch(registerUserFailure(json.errors));
          }
        });
      });
    }
  };
}

export default {
  registerUser,
  updateForm,
};
