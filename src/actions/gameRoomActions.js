/* @flow */
export const JOIN_GAME = 'gameRoom/JOIN_GAME';
export const PLAYER_JOINED = 'gameRoom/PLAYER_JOINED';
export const LEAVE_GAME = 'gameRoom/LEAVE_GAME';
export const PLAYER_LEFT = 'gameRoom/PLAYER_LEFT';

export const ENTER_ROOM = 'gameRoom/ENTER_ROOM';
export const LEAVE_ROOM = 'gameRoom/LEAVE_ROOM';
export const REFRESH_GAME = 'gameRoom/REFRESH';
export const GAME_NOT_FOUND = 'gameRoom/NOT_FOUND';

export const START_GAME = 'gameRoom/START_GAME';
export const GAME_STARTED = 'gameRoom/GAME_STARTED';
export const GAME_ENDED = 'gameRoom/ENDED';

export const CANCEL_GAME = 'gameRoom/CANCEL';
export const GAME_CANCELED = 'gameRoom/CANCELED';

import type { Game } from 'reducers/data/games/gameReducer';

type RefreshGameAction = {
  type: 'gameRoom/REFRESH',
  payload: {
    game: Game,
  }
}
export function refreshGame(game: Game): RefreshGameAction {
  return {
    type: REFRESH_GAME,
    payload: {
      game,
    },
  };
}


type GameNotFoundAction = {
  type: 'gameRoom/NOT_FOUND',
  payload: {
    game: GameWithId,
  }
}
export function gameNotFound(gameId: string): GameNotFoundAction {
  return {
    type: GAME_NOT_FOUND,
    payload: {
      game: { id: gameId },
    },
  };
}

type EnterRoomAction = {
  type: 'gameRoom/ENTER_ROOM',
  payload: string,
}
export function enterRoom(gameId: string): EnterRoomAction {
  return {
    type: ENTER_ROOM,
    payload: gameId,
  };
}

type LeaveRoomAction = {
  type: 'gameRoom/LEAVE_ROOM',
  payload: string,
}
export function leaveRoom(gameId: string): LeaveRoomAction {
  return {
    type: LEAVE_ROOM,
    payload: gameId,
  };
}

type PlayerJoinedAction = {
  type: 'gameRoom/PLAYER_JOINED',
  payload: {
    game: GameWithId,
    user: UserWithId,
  }
}
export function playerJoined(gameId: string, userId: string): PlayerJoinedAction {
  return {
    type: PLAYER_JOINED,
    payload: {
      game: { id: gameId },
      user: { id: userId },
    },
  };
}

type JoinGameAction = {
  type: 'gameRoom/JOIN_GAME',
  payload: string,
}
export function joinGame(gameId: string): JoinGameAction {
  return {
    type: JOIN_GAME,
    payload: gameId,
  };
}

type PlayerLeftAction = {
  type: 'gameRoom/PLAYER_LEFT',
  payload: {
    game: GameWithId,
    user: UserWithId,
  }
}
export function playerLeft(gameId: string, userId: string): PlayerLeftAction {
  return {
    type: PLAYER_LEFT,
    payload: {
      game: { id: gameId },
      user: { id: userId },
    },
  };
}

type LeaveGameAction = {
  type: 'gameRoom/LEAVE_GAME',
  payload: string,
}
export function leaveGame(gameId: string): LeaveGameAction {
  return {
    type: LEAVE_GAME,
    payload: gameId,
  };
}

type GameStartedAction = {
  type: 'gameRoom/GAME_STARTED',
  payload: {
    game: GameWithId & {
      state: Object,
    }
  }
}
export function gameStarted(gameId: string, gameState: Object): GameStartedAction {
  return {
    type: GAME_STARTED,
    payload: {
      game: {
        id: gameId,
        state: gameState,
      },
    },
  };
}

type StartGameAction = {
  type: 'gameRoom/START_GAME',
  payload: string,
}
export function startGame(gameId: string): StartGameAction {
  return {
    type: START_GAME,
    payload: gameId,
  };
}

type GameEndedAction = {
  type: 'gameRoom/ENDED',
  payload: {
    game: GameWithId,
  }
}
export function gameEnded(gameId: string): GameEndedAction {
  return {
    type: GAME_ENDED,
    payload: {
      game: {
        id: gameId,
      },
    },
  };
}

type GameCanceledAction = {
  type: 'gameRoom/CANCELED',
  payload: {
    game: GameWithId,
  },
}
export function gameCanceled(gameId: string): GameCanceledAction {
  return {
    type: GAME_CANCELED,
    payload: {
      game: {
        id: gameId,
      },
    },
  };
}

type CancelGameAction = {
  type: 'gameRoom/CANCEL',
  payload: string,
}
export function cancelGame(gameId: string): CancelGameAction {
  return {
    type: CANCEL_GAME,
    payload: gameId,
  };
}

export type GameRoomAction =
  | RefreshGameAction
  | GameNotFoundAction
  | EnterRoomAction
  | LeaveRoomAction
  | PlayerJoinedAction
  | JoinGameAction
  | PlayerLeftAction
  | LeaveGameAction
  | GameStartedAction
  | StartGameAction
  | GameEndedAction
  | GameCanceledAction
  | CancelGameAction
  ;

export default {
  joinGame,
  playerJoined,
  leaveGame,
  playerLeft,
  enterRoom,
  leaveRoom,
  startGame,
  cancelGame,
};
