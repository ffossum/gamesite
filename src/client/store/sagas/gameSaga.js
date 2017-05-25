import { call, put, select, takeEvery } from 'redux-saga/effects';
import { userIdSelector } from 'selectors/commonSelectors';
import { PERFORM_ACTION, actionRejected } from 'actions/gameActions';
import socket from 'client/socket';

export function* performActionSaga(action) {
  const userId = yield select(userIdSelector);
  if (userId) {
    const payload = {
      ...action.payload,
      user: { id: userId },
    };
    try {
      yield call(socket.rpc, action.type, payload);
    } catch (err) {
      const gameId = payload.game.id;
      yield put(actionRejected({ id: gameId }));
    }
  }
}

export default function* gameSaga() {
  yield [
    takeEvery(PERFORM_ACTION, performActionSaga),
  ];
}
