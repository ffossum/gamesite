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
import { map, flatten } from 'lodash';
import socket from 'client/socket';

export function* refreshLobbySaga(action) {
  const { games, refreshed } = action.payload;
  const users = flatten(map(games, game => game.users));

  yield put(getUserData(...users));
  yield put(refreshLobbySuccess({ games, refreshed }));
}

export function* joinLobbySaga(action) {
  const lastRefreshed = yield select(lobbyLastRefreshedSelector);

  try {
    const result = yield call(socket.rpcPromise, action.type, { lastRefreshed });
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

  const payload = {
    ...action.payload,
    user: { id: userId },
  };

  try {
    const game = yield call(socket.rpcPromise, action.type, payload);
    if (game) {
      yield put(createGameSuccess(game));
    }
  } catch (err) {
    // do nothing
  }
}

export function* gameCreatedSaga(action) {
  const { game } = action.payload;
  yield put(getUserData(...game.users));
}

export const watchJoinLobby = takeEvery(JOIN_LOBBY, joinLobbySaga);
export const watchLeaveLobby = takeEvery(LEAVE_LOBBY, leaveLobbySaga);
export const watchRefreshLobby = takeEvery(REFRESH_LOBBY_REQUEST, refreshLobbySaga);
export const watchCreateGame = takeEvery(CREATE_GAME, createGameSaga);
export const watchGameCreated = takeEvery(GAME_CREATED, gameCreatedSaga);
