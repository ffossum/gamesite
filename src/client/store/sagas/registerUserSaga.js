import fetch from 'isomorphic-fetch';
import validator from 'validator';
import { isEmpty } from 'lodash/fp';
import { reloadPage } from 'client/util/clientUtils';
import { call, put, takeEvery } from 'redux-saga/effects';
import errorTypes from 'constants/errorType';
import {
  REGISTER_USER_REQUEST,
  registerUserFailure,
} from 'actions/registerUserActions';

export function* registerUserRequestSaga(action) {
  const {
    email,
    username,
    password,
    repeatPassword,
    remember,
  } = action.payload;

  const registrationErrors = {};
  if (password !== repeatPassword) {
    registrationErrors.repeatPassword = errorTypes.PASSWORDS_DO_NOT_MATCH;
  }
  if (!validator.isEmail(email)) {
    registrationErrors.email = errorTypes.INVALID_EMAIL;
  }

  if (!isEmpty(registrationErrors)) {
    yield put(registerUserFailure(registrationErrors));
  } else {
    try {
      const res = yield call(fetch, '/api/register', {
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
      });
      if (res.ok) {
        yield call(reloadPage);
      } else {
        const json = yield res.json();
        yield put(registerUserFailure(json.errors));
      }
    } catch (err) {
      yield put(registerUserFailure());
    }
  }
}

export default function* registerUserSaga() {
  yield [
    takeEvery(REGISTER_USER_REQUEST, registerUserRequestSaga),
  ];
}
