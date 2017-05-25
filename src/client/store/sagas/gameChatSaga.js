import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getGameChannelName } from 'util/channelUtils';
import { getUserData } from 'actions/userDataActions';
import { userIdSelector } from 'selectors/commonSelectors';
import { NEW_GAME_MESSAGE, SEND_GAME_MESSAGE } from 'actions/gameChatActions';
import socket from 'client/socket';

export function* newGameMessageSaga(action) {
  const { message } = action.payload;
  yield put(getUserData(message.user));
}

export function* sendGameMessageSaga(action) {
  const userId = yield select(userIdSelector);
  if (userId) {
    const gameId = action.payload.game.id;
    const payload = {
      ...action.payload,
      user: { id: userId },
    };
    yield call(socket.publish, getGameChannelName(gameId), [action.type, payload]);
  }
}

export default function* gameChatSaga() {
  yield [
    takeEvery(NEW_GAME_MESSAGE, newGameMessageSaga),
    takeEvery(SEND_GAME_MESSAGE, sendGameMessageSaga),
  ];
}
