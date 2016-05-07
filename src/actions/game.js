export const PERFORM_ACTION = 'game/ACTION';
export const NEW_ACTION = 'game/NEW_ACTION';

export function performAction(gameId, action) {
  return dispatch => {
    dispatch({
      type: PERFORM_ACTION,
      payload: {
        game: { id: gameId },
        action,
      },
      meta: {
        socket: true,
      },
    });
  };
}

export function newAction(game, state) {
  return {
    type: NEW_ACTION,
    payload: {
      game,
      state,
    },
  };
}

export default {
  performAction,
};
