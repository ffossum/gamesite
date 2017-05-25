/* @flow */
export const JOIN_LOBBY = 'lobby: join';
export const LEAVE_LOBBY = 'lobby: leave';
export const REFRESH_LOBBY_REQUEST = 'lobby: refresh request';
export const REFRESH_LOBBY_SUCCESS = 'lobby: refresh success';

export const CREATE_GAME = 'lobby: create game request';
export const CREATE_GAME_SUCCESS =  'lobby: create game success';
export const GAME_CREATED = 'lobby: game created';
export const UPDATE_GAME = 'lobby: update game';
export const GAMES_UPDATED = 'lobby: games updated';

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
  type: 'lobby: update game',
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
  type: 'lobby: games updated',
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
  type: 'lobby: refresh success',
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
  type: 'lobby: refresh request',
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
  type: 'lobby: join',
}
export function joinLobby(): Action {
  return {
    type: JOIN_LOBBY,
  };
}

type LeaveLobbyAction = {
  type: 'lobby: leave',
}
export function leaveLobby(): Action {
  return {
    type: LEAVE_LOBBY,
  };
}

type CreateGameSuccessAction = {
  type: 'lobby: create game success',
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
  type: 'lobby: create game request',
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
  type: 'lobby: game created',
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
