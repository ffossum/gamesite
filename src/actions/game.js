export const PERFORM_ACTION = 'game/ACTION';
export const NEW_ACTION = 'game/NEW_ACTION';
export const ACTION_REJECTED = 'game/ACTION_REJECTED';

export function newAction(game, state) {
  return {
    type: NEW_ACTION,
    payload: {
      game,
      state,
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
  return dispatch => {
    const game = { id: gameId };
    dispatch({
      type: PERFORM_ACTION,
      payload: {
        game,
        action,
      },
      meta: {
        socket: res => {
          if (res.ok) {
            dispatch(newAction(game, res.state));
          } else {
            dispatch(actionRejected(game));
          }
        },
      },
    });
  };
}

export default {
  performAction,
};
