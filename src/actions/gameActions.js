/* @flow */
export const NEW_ACTION = 'game/NEW_ACTION';
export const ACTION_REJECTED = 'game/ACTION_REJECTED';
export const PERFORM_ACTION = 'game/ACTION';

type NewActionAction = {
  type: 'game/NEW_ACTION',
  payload: {
    game: GameWithId,
    patch: Object[],
  },
}
export function newAction(game: GameWithId, patch: Object[]): NewActionAction {
  return {
    type: NEW_ACTION,
    payload: {
      game,
      patch,
    },
  };
}

type ActionRejectedAction = {
  type: 'game/ACTION_REJECTED',
  payload: {
    game: GameWithId,
  }
}
export function actionRejected(game: GameWithId): ActionRejectedAction {
  return {
    type: ACTION_REJECTED,
    payload: { game },
  };
}

type PerformActionAction = {
  type: 'game/ACTION',
  payload: {
    action: any,
    game: GameWithId,
  }
}
export function performAction(gameId: GameId, action: any): PerformActionAction {
  return {
    type: PERFORM_ACTION,
    payload: {
      action,
      game: { id: gameId },
    },
  };
}

export type GameAction =
  | NewActionAction
  | ActionRejectedAction
  | PerformActionAction
  ;

export default {
  performAction,
};
