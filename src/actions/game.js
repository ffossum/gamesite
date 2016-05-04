export const PERFORM_ACTION = 'game/ACTION';

export function performAction(action) {
  return dispatch => {
    dispatch({
      type: PERFORM_ACTION,
      payload: action,
      meta: {
        socket: newState => {
          console.log(newState);
        },
      },
    });
  };
}

export default {
  performAction,
};
