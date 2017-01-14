import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import errorTypes from 'constants/errorType';
import {
  RESET_PASSWORD_REQUEST,
  resetPasswordSuccess,
  resetPasswordFailure,
} from 'actions/resetPasswordActions';

export function* resetPasswordRequestSaga(action) {
  const { password, repeatPassword, userId, token } = action.payload;
  if (password !== repeatPassword) {
    yield put(resetPasswordFailure({ repeatPassword: errorTypes.PASSWORDS_DO_NOT_MATCH }));
  } else {
    try {
      const res = yield call(fetch, '/api/reset', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          token,
          userId,
        }),
      });

      if (res.ok) {
        yield put(resetPasswordSuccess());
      } else {
        const json = yield res.json();
        yield put(resetPasswordFailure(json.errors));
      }
    } catch (err) {
      yield put(resetPasswordFailure());
    }
  }
}

export default function* forgotPasswordSaga() {
  yield [
    takeEvery(RESET_PASSWORD_REQUEST, resetPasswordRequestSaga),
  ];
}
