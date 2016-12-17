import { get } from 'lodash';

export const PERFORM_ACTION = 'game/ACTION';
export const NEW_ACTION = 'game/NEW_ACTION';
export const ACTION_REJECTED = 'game/ACTION_REJECTED';

export function newAction(game, patch) {
  return {
    type: NEW_ACTION,
    payload: {
      game,
      patch,
    },
  };
}

export function actionRejected(game) {
  return {
    type: ACTION_REJECTED,
    payload: { game },
  };
}

export function performAction(gameId, action) {
  return (dispatch, getState) => {
    const userId = get(getState(), ['session', 'userId']);
    const type = PERFORM_ACTION;
    const payload = {
      action,
      game: { id: gameId },
      user: { id: userId },
    };

    dispatch({
      type,
      payload,
      meta: {
        deepstream: socket => {
          socket.rpc(type, payload, err => {
            if (err) {
              dispatch(actionRejected({ id: gameId }));
            }
          });
        },
      },
    });
  };
}

export default {
  performAction,
};
