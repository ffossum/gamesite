import { LOCATION_CHANGE } from 'react-router-redux';
import { getGameIdFromRoute } from 'util/routeUtils';
import { enterRoom, leaveRoom } from 'actions/gameRoom';

let currentGameRoomId = null;

export default store => next => action => {
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
