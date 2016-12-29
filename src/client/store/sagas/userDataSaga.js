import fetch from 'isomorphic-fetch';
import {
  filter,
  isEmpty,
  uniq,
} from 'lodash';
import { userDataSelector } from 'selectors/commonSelectors';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GET_USER_DATA_REQUEST, getUserDataSuccess } from 'actions/userData';

const pendingFetches = {};

export function* getUserDataSaga(action) {
  const userIds = action.payload;
  const stateUsers = yield select(userDataSelector);

  const missingUserIds = filter(uniq(userIds), userId => !stateUsers[userId]);

  if (!isEmpty(missingUserIds)) {
    missingUserIds.sort();
    const fetchUrl = `/api/users?id=${missingUserIds.join(',')}`;

    if (!pendingFetches[fetchUrl]) {
      pendingFetches[fetchUrl] = true;

      try {
        const res = yield call(fetch, fetchUrl);

        if (res.ok) {
          const json = yield res.json();
          yield put(getUserDataSuccess(json.users));
        }
      } finally {
        delete pendingFetches[fetchUrl];
      }
    }
  }
}

export const watchUserDataRequest = takeEvery(GET_USER_DATA_REQUEST, getUserDataSaga);
