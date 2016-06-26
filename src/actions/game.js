export const PERFORM_ACTION = 'game/ACTION';
export const NEW_ACTION = 'game/NEW_ACTION';

export function performAction(gameId, action) {
  return (dispatch, getState) => {
    const session = getState().get('session').toJS();
    dispatch({
      type: PERFORM_ACTION,
      payload: {
        game: { id: gameId },
        action,
      },
      meta: {
        socket: true,
        session,
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
