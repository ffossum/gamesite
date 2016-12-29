import { getUserData } from 'actions/userData';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  JOIN_LOBBY,
  LEAVE_LOBBY,
  REFRESH_LOBBY_REQUEST,
  refreshLobbySuccess,
  refreshLobby,
} from 'actions/lobbyActions';
import { lobbyLastRefreshedSelector } from 'selectors/commonSelectors';
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
    yield put(refreshLobby(result));
    yield call(socket.subscribe, 'lobby');
  } catch (err) {
    // do nothing
  }
}

export function* leaveLobbySaga() {
  yield call(socket.unsubscribe, 'lobby');
}

export const watchJoinLobby = takeEvery(JOIN_LOBBY, joinLobbySaga);
export const watchLeaveLobby = takeEvery(LEAVE_LOBBY, leaveLobbySaga);
export const watchRefreshLobby = takeEvery(REFRESH_LOBBY_REQUEST, refreshLobbySaga);
