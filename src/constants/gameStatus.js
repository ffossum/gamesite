// @flow
export type GameStatus =
  | 'not_started'
  | 'in_progress'
  | 'ended'
  | 'canceled'
  ;

export const NOT_STARTED: GameStatus = 'not_started';
export const IN_PROGRESS: GameStatus = 'in_progress';
export const ENDED: GameStatus = 'ended';
export const CANCELED: GameStatus = 'canceled';
