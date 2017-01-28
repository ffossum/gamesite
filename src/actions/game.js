/* @flow */
type PerformActionType = 'game/ACTION';
type NewActionType = 'game/NEW_ACTION';
type ActionRejectedType = 'game/ACTION_REJECTED';
export const PERFORM_ACTION: PerformActionType = 'game/ACTION';
export const NEW_ACTION: NewActionType = 'game/NEW_ACTION';
export const ACTION_REJECTED: ActionRejectedType = 'game/ACTION_REJECTED';

type NewActionAction = {
  type: NewActionType,
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
  type: ActionRejectedType,
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
  type: PerformActionType,
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
