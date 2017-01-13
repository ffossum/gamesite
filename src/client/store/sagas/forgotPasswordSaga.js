import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import validator from 'validator';
import errorTypes from 'constants/errorType';
import {
  FORGOT_PASSWORD_REQUEST,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from 'actions/forgotPasswordActions';

export function* forgotPasswordRequestSaga(action) {
  const { email } = action.payload;

  if (!validator.isEmail(email)) {
    yield put(forgotPasswordFailure({ email: errorTypes.INVALID_EMAIL }));
  } else {
    try {
      const res = yield call(fetch, '/api/forgot', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        yield put(forgotPasswordSuccess());
      } else {
        const json = yield res.json();
        yield put(forgotPasswordFailure(json.errors));
      }
    } catch (err) {
      yield put(forgotPasswordFailure({ generic: 'technical error' }));
    }
  }
}

export default function* forgotPasswordSaga() {
  yield [
    takeEvery(FORGOT_PASSWORD_REQUEST, forgotPasswordRequestSaga),
  ];
}
