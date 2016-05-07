import socket from 'client/socket';
import _ from 'lodash';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getGameIdFromRoute } from 'util/routeUtils';
import { enterRoom, leaveRoom } from 'actions/gameRoom';

let currentGameRoomId = null;

export default store => next => action => {
  if (action.meta && action.meta.socket) {
    const args = [action.type, action.payload || ''];
    if (_.isFunction(action.meta.socket)) {
      args.push(action.meta.socket);
    }
    socket.emit(...args);
  }

  if (action.type === LOCATION_CHANGE) {
    const { pathname } = action.payload;
    const gameId = getGameIdFromRoute(pathname);

    const enteredNewRoom = gameId && (gameId !== currentGameRoomId);
    const leftRoom = currentGameRoomId && (gameId !== currentGameRoomId);

    if (leftRoom) {
      store.dispatch(leaveRoom(currentGameRoomId));
      currentGameRoomId = null;
    }

    if (enteredNewRoom) {
      store.dispatch(enterRoom(gameId));
      currentGameRoomId = gameId;
    }
  }
  next(action);
};
