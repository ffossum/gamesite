import { getUserData } from 'actions/userData';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  JOIN_LOBBY,
  LEAVE_LOBBY,
  REFRESH_LOBBY_REQUEST,
  CREATE_GAME,
  createGameSuccess,
  GAME_CREATED,
  refreshLobbySuccess,
  refreshLobby,
} from 'actions/lobbyActions';
import { lobbyLastRefreshedSelector, userIdSelector } from 'selectors/commonSelectors';
import { map, flatten } from 'lodash/fp';
import socket from 'client/socket';

export function* refreshLobbySaga(action) {
  const { games, refreshed } = action.payload;
  const users = flatten(map(game => game.users, games));

  yield put(getUserData(...users));
  yield put(refreshLobbySuccess({ games, refreshed }));
}

export function* joinLobbySaga(action) {
  const lastRefreshed = yield select(lobbyLastRefreshedSelector);

  try {
    const result = yield call(socket.rpc, action.type, { lastRefreshed });
    if (result) {
      yield put(refreshLobby(result));
    }
  } finally {
    yield call(socket.subscribe, 'lobby');
  }
}

export function* leaveLobbySaga() {
  yield call(socket.unsubscribe, 'lobby');
}

export function* createGameSaga(action) {
  const userId = yield select(userIdSelector);

  if (userId) {
    const payload = {
      ...action.payload,
      user: { id: userId },
    };

    try {
      const game = yield call(socket.rpc, action.type, payload);
      if (game) {
        yield put(createGameSuccess(game));
      }
    } catch (err) {
      // do nothing
    }
  }
}

export function* gameCreatedSaga(action) {
  const { game } = action.payload;
  yield put(getUserData(...game.users));
}

export default function* lobbySaga() {
  yield [
    takeEvery(JOIN_LOBBY, joinLobbySaga),
    takeEvery(LEAVE_LOBBY, leaveLobbySaga),
    takeEvery(REFRESH_LOBBY_REQUEST, refreshLobbySaga),
    takeEvery(CREATE_GAME, createGameSaga),
    takeEvery(GAME_CREATED, gameCreatedSaga),
  ];
}
