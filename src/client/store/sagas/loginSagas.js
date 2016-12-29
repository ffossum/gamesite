import fetch from 'isomorphic-fetch';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  logInFailure,
  LOG_OUT,
} from 'actions/login';
import { reloadPage } from 'client/util/clientUtils';

function* logInSaga(action) {
  try {
    const res = yield call(fetch, '/api/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(action.payload),
    });

    if (res.ok) {
      yield call(reloadPage);
    } else {
      yield put(logInFailure());
    }
  } catch (err) {
    yield put(logInFailure());
  }
}

function* logOutSaga() {
  try {
    yield call(fetch, '/api/logout', {
      method: 'post',
      credentials: 'same-origin',
    });
  } finally {
    yield call(reloadPage);
  }
}

export const watchLogInRequest = takeEvery(LOG_IN_REQUEST, logInSaga);
export const watchLogOut = takeEvery(LOG_OUT, logOutSaga);
