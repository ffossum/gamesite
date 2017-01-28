/* @flow */
type JoinGameType = 'gameRoom/JOIN_GAME';
type PlayerJoinedType = 'gameRoom/PLAYER_JOINED';
type LeaveGameType = 'gameRoom/LEAVE_GAME';
type PlayerLeftType = 'gameRoom/PLAYER_LEFT';
export const JOIN_GAME: JoinGameType = 'gameRoom/JOIN_GAME';
export const PLAYER_JOINED: PlayerJoinedType = 'gameRoom/PLAYER_JOINED';
export const LEAVE_GAME: LeaveGameType = 'gameRoom/LEAVE_GAME';
export const PLAYER_LEFT: PlayerLeftType = 'gameRoom/PLAYER_LEFT';

type EnterRoomType = 'gameRoom/ENTER_ROOM';
type LeaveRoomType = 'gameRoom/LEAVE_ROOM';
type RefreshGameType = 'gameRoom/REFRESH';
type GameNotFoundType = 'gameRoom/NOT_FOUND';
export const ENTER_ROOM: EnterRoomType = 'gameRoom/ENTER_ROOM';
export const LEAVE_ROOM: LeaveRoomType = 'gameRoom/LEAVE_ROOM';
export const REFRESH_GAME: RefreshGameType = 'gameRoom/REFRESH';
export const GAME_NOT_FOUND: GameNotFoundType = 'gameRoom/NOT_FOUND';

type StartGameType = 'gameRoom/START_GAME';
type GameStartedType = 'gameRoom/GAME_STARTED';
type GameEndedType = 'gameRoom/ENDED';
export const START_GAME: StartGameType = 'gameRoom/START_GAME';
export const GAME_STARTED: GameStartedType = 'gameRoom/GAME_STARTED';
export const GAME_ENDED: GameEndedType = 'gameRoom/ENDED';

type CancelGameType = 'gameRoom/CANCEL';
type GameCanceledType = 'gameRoom/CANCELED';
export const CANCEL_GAME: CancelGameType = 'gameRoom/CANCEL';
export const GAME_CANCELED: GameCanceledType = 'gameRoom/CANCELED';

import type { Game } from 'reducers/data/games/gameReducer';

type RefreshGameAction = {
  type: RefreshGameType,
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
  type: GameNotFoundType,
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
  type: EnterRoomType,
  payload: string,
}
export function enterRoom(gameId: string): EnterRoomAction {
  return {
    type: ENTER_ROOM,
    payload: gameId,
  };
}

type LeaveRoomAction = {
  type: LeaveRoomType,
  payload: string,
}
export function leaveRoom(gameId: string): LeaveRoomAction {
  return {
    type: LEAVE_ROOM,
    payload: gameId,
  };
}

type PlayerJoinedAction = {
  type: PlayerJoinedType,
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
  type: JoinGameType,
  payload: string,
}
export function joinGame(gameId: string): JoinGameAction {
  return {
    type: JOIN_GAME,
    payload: gameId,
  };
}

type PlayerLeftAction = {
  type: PlayerLeftType,
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
  type: LeaveGameType,
  payload: string,
}
export function leaveGame(gameId: string): LeaveGameAction {
  return {
    type: LEAVE_GAME,
    payload: gameId,
  };
}

type GameStartedAction = {
  type: GameStartedType,
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
  type: StartGameType,
  payload: string,
}
export function startGame(gameId: string): StartGameAction {
  return {
    type: START_GAME,
    payload: gameId,
  };
}

type GameEndedAction = {
  type: GameEndedType,
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
  type: GameCanceledType,
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
  type: CancelGameType,
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
