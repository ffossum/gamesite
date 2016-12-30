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
  PLAYER_JOINED,
  JOIN_GAME,
  LEAVE_GAME,
  CANCEL_GAME,
  START_GAME,
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

export function* playerJoinedSaga(action) {
  const userId = action.payload.user.id;
  yield put(getUserData(userId));
}

export function* joinGameSaga(action) {
  const userId = yield select(userIdSelector);

  if (userId) {
    const gameId = action.payload;
    const payload = {
      game: { id: gameId },
      user: { id: userId },
    };

    yield call(socket.rpcPromise, action.type, payload);
  }
}

const leaveGameSaga = joinGameSaga;
const cancelGameSaga = joinGameSaga;
const startGameSaga = joinGameSaga;

export default function* gameRoomSaga() {
  yield [
    takeEvery(ENTER_ROOM, enterRoomSaga),
    takeEvery(LEAVE_ROOM, leaveRoomSaga),
    takeEvery(REFRESH_GAME, refreshGameSaga),
    takeEvery(PLAYER_JOINED, playerJoinedSaga),
    takeEvery(JOIN_GAME, joinGameSaga),
    takeEvery(LEAVE_GAME, leaveGameSaga),
    takeEvery(CANCEL_GAME, cancelGameSaga),
    takeEvery(START_GAME, startGameSaga),
  ];
}
