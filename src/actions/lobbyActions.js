// @flow
type JoinLobbyType = 'lobby: join';
type LeaveLobbyType = 'lobby: leave';
type RefreshRequestType = 'lobby: refresh request';
type RefreshSuccessType = 'lobby: refresh success';

export const JOIN_LOBBY: JoinLobbyType = 'lobby: join';
export const LEAVE_LOBBY: LeaveLobbyType = 'lobby: leave';
export const REFRESH_LOBBY_REQUEST: RefreshRequestType = 'lobby: refresh request';
export const REFRESH_LOBBY_SUCCESS: RefreshSuccessType = 'lobby: refresh success';

type CreateGameType = 'lobby: create game request';
type CreateGameSuccessType = 'lobby: create game success';
type GameCreatedType = 'lobby: game created';
type UpdateGameType = 'lobby: update game';
type GamesUpdatedType = 'lobby: games updated';
export const CREATE_GAME: CreateGameType = 'lobby: create game request';
export const CREATE_GAME_SUCCESS: CreateGameSuccessType =  'lobby: create game success';
export const GAME_CREATED: GameCreatedType = 'lobby: game created';
export const UPDATE_GAME: UpdateGameType = 'lobby: update game';
export const GAMES_UPDATED: GamesUpdatedType = 'lobby: games updated';

import type { Action } from './types';
import type { GameStatus } from 'constants/gameStatus';

type GameUpdate = {
  id: string,
  status?: GameStatus,
  users?: string[],
}

type GameUpdates = {
  [key: string]: GameUpdate,
}

type UpdateGameAction = {
  type: UpdateGameType,
  payload: {
    game: GameUpdate,
  }
}

export function updateGame(game: GameUpdate): Action {
  return {
    type: UPDATE_GAME,
    payload: {
      game,
    },
  };
}

type GamesUpdatedAction = {
  type: GamesUpdatedType,
  payload: {
    games: GameUpdates,
  }
}
export function gamesUpdated(games: GameUpdates): Action {
  return {
    type: GAMES_UPDATED,
    payload: {
      games,
    },
  };
}

type PlayerCount = {
  required: number,
  optional: number,
}
import type { Game } from 'reducers/data/games/gameReducer';
type RefreshLobbyData = {
  games: {
    [id: string]: Game,
  }
}
type RefreshLobbySuccessAction = {
  type: RefreshSuccessType,
  payload: RefreshLobbyData,
}
export function refreshLobbySuccess({ games }: RefreshLobbyData): Action {
  return {
    type: REFRESH_LOBBY_SUCCESS,
    payload: {
      games,
    },
  };
}

type RefreshLobbyAction = {
  type: RefreshRequestType,
  payload: RefreshLobbyData,
}
export function refreshLobby({ games }: RefreshLobbyData): Action {
  return {
    type: REFRESH_LOBBY_REQUEST,
    payload: {
      games,
    },
  };
}

type JoinLobbyAction = {
  type: JoinLobbyType,
}
export function joinLobby(): Action {
  return {
    type: JOIN_LOBBY,
  };
}

type LeaveLobbyAction = {
  type: LeaveLobbyType,
}
export function leaveLobby(): Action {
  return {
    type: LEAVE_LOBBY,
  };
}

type CreateGameSuccessAction = {
  type: CreateGameSuccessType,
  payload: {
    game: Game,
  },
  meta: {
    history: {
      method: 'push',
      args: string[],
    }
  }
}
export function createGameSuccess(game: Game): Action {
  return {
    type: CREATE_GAME_SUCCESS,
    payload: {
      game,
    },
    meta: {
      history: {
        method: 'push',
        args: [`/game/${game.id}`],
      },
    },
  };
}

type GameCreationData = {
  playerCount: PlayerCount,
  comment: string,
  options: Object,
}
type CreateGameAction = {
  type: CreateGameType,
  payload: {
    game: GameCreationData,
  }
}
export function createGame(data: GameCreationData): Action {
  return {
    type: CREATE_GAME,
    payload: {
      game: data,
    },
  };
}

type GameCreatedAction = {
  type: GameCreatedType,
  payload: {
    game: Game,
  }
}
export function gameCreated(game: Game): Action {
  return {
    type: GAME_CREATED,
    payload: {
      game,
    },
  };
}

export type LobbyAction =
  | UpdateGameAction
  | GamesUpdatedAction
  | RefreshLobbySuccessAction
  | RefreshLobbyAction
  | JoinLobbyAction
  | LeaveLobbyAction
  | CreateGameSuccessAction
  | CreateGameAction
  | GameCreatedAction
  ;

export default {
  joinLobby,
  leaveLobby,
  createGame,
};
