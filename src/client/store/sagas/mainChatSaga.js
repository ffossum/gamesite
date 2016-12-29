import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getUserData } from 'actions/userData';
import { SEND_MESSAGE, NEW_MESSAGE } from 'actions/mainChat';
import socket from 'client/socket';
import { userIdSelector } from 'selectors/commonSelectors';


export function* sendMessageSaga(action) {
  const userId = yield select(userIdSelector);

  const message = {
    ...action.payload,
    user: { id: userId },
  };

  yield call(socket.publish, 'mainchat', [action.type, message]);
}

export function* newMessageSaga(action) {
  const { user } = action.payload;
  yield put(getUserData(user));
}

export const watchMainChatSendMessage = takeEvery(SEND_MESSAGE, sendMessageSaga);
export const watchMainChatNewMessage = takeEvery(NEW_MESSAGE, newMessageSaga);
