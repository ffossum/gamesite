export const JOIN_LOBBY = 'games/JOIN_LOBBY';
export const LEAVE_LOBBY = 'games/LEAVE_LOBBY';

export const REFRESH_LOBBY_REQUEST = 'games/REFRESH_LOBBY_REQUEST';
export const REFRESH_LOBBY_SUCCESS = 'games/REFRESH_LOBBY_SUCCESS';

export const CREATE_GAME = 'games/CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'games/CREATE_GAME_SUCCESS';

export const GAME_CREATED = 'games/GAME_CREATED';
export const UPDATE_GAME = 'games/UPDATE_GAME';

export const GAMES_UPDATED = 'games/UPDATED';

export function updateGame(game) {
  return {
    type: UPDATE_GAME,
    payload: {
      game,
    },
  };
}

export function gamesUpdated(games) {
  return {
    type: GAMES_UPDATED,
    payload: {
      games,
    },
  };
}

export function refreshLobbySuccess({ games, refreshed }) {
  return {
    type: REFRESH_LOBBY_SUCCESS,
    payload: {
      games,
      refreshed,
    },
  };
}

export function refreshLobby({ games, refreshed }) {
  return {
    type: REFRESH_LOBBY_REQUEST,
    payload: {
      games,
      refreshed,
    },
  };
}

export function joinLobby() {
  return {
    type: JOIN_LOBBY,
  };
}

export function leaveLobby() {
  return {
    type: LEAVE_LOBBY,
  };
}

export function createGameSuccess(game) {
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

export function createGame(data) {
  return {
    type: CREATE_GAME,
    payload: {
      game: data,
    },
  };
}

export function gameCreated(game) {
  return {
    type: GAME_CREATED,
    payload: {
      game,
    },
  };
}

export default {
  joinLobby,
  leaveLobby,
  createGame,
};
