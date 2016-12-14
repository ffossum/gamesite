import { getUserData } from './userData';
import { get } from 'lodash';
import { getGameChannelName } from 'util/channelUtils';

export const SEND_GAME_MESSAGE = 'gameChat/SEND_MSG';
export const NEW_GAME_MESSAGE = 'gameChat/NEW_MSG';

export function newGameMessage({ user, game, text }) {
  const time = new Date().toJSON();

  const message = {
    user: user.id,
    time,
    text,
  };

  return dispatch => {
    dispatch(getUserData(message.user));
    dispatch({
      type: NEW_GAME_MESSAGE,
      payload: {
        game,
        message,
      },
    });
  };
}

export function sendGameMessage(gameId, text) {
  return (dispatch, getState) => {
    const state = getState();
    const userId = get(state, ['session', 'userId']);

    const type = SEND_GAME_MESSAGE;
    const payload = {
      user: { id: userId },
      game: { id: gameId },
      text,
    };

    if (userId) {
      dispatch({
        type,
        payload,
        meta: {
          deepstream: socket => {
            socket.publish(getGameChannelName(gameId), [type, payload]);
          },
        },
      });
    }
  };
}

export default {
  sendGameMessage,
  newGameMessage,
};
