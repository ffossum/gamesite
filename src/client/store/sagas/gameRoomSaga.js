import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getUserData } from 'actions/userData';
import { gameByIdSelector, userIdSelector } from 'selectors/commonSelectors';
import { includes } from 'lodash';
import socket from 'client/socket';
import { getGameChannelName, getSpectatorChannelName } from 'util/channelUtils';
import { clearChat } from 'actions/gameChat';

import {
  REFRESH_GAME,
  refreshGame,
  gameNotFound,
  ENTER_ROOM,
  LEAVE_ROOM,
} from 'actions/gameRoom';

export function* refreshGameSaga(action) {
  const { game } = action.payload;
  yield put(getUserData(...game.users));
}

function isInGame(game = {}, userId) {
  return includes(game.users, userId);
}

export function* enterRoomSaga(action) {
  const gameId = action.payload;
  const userId = yield select(userIdSelector);

  const payload = {
    game: { id: gameId },
    user: { id: userId },
  };

  try {
    const refreshedGame = yield call(socket.rpcPromise, action.type, payload);

    yield call(socket.subscribe, getGameChannelName(gameId));
    if (!isInGame(refreshedGame, userId)) {
      yield call(socket.subscribe, getSpectatorChannelName(gameId));
    }
    yield put(refreshGame(refreshedGame));
  } catch (err) {
    yield put(gameNotFound(gameId));
  }
}

export function* leaveRoomSaga(action) {
  const gameId = action.payload;

  const userId = yield select(userIdSelector);
  const game = yield select(gameByIdSelector, gameId);

  yield call(socket.unsubscribe, getGameChannelName(gameId));
  yield call(socket.unsubscribe, getSpectatorChannelName(gameId));

  if (!isInGame(game, userId)) {
    yield put(clearChat(gameId));
  }
}

export const watchEnterRoom = takeEvery(ENTER_ROOM, enterRoomSaga);
export const watchLeaveRoom = takeEvery(LEAVE_ROOM, leaveRoomSaga);
export const watchRefreshGame = takeEvery(REFRESH_GAME, refreshGameSaga);
