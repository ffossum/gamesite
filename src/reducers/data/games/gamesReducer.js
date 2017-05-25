/* @flow */
import {
  CREATE_GAME_SUCCESS,
  GAME_CREATED,
  REFRESH_LOBBY_SUCCESS,
  UPDATE_GAME,
  GAMES_UPDATED,
} from 'actions/lobbyActions';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  REFRESH_GAME,
  GAME_STARTED,
  GAME_NOT_FOUND,
  GAME_ENDED,
  GAME_CANCELED,
} from 'actions/gameRoomActions';
import {
  NEW_GAME_MESSAGE,
  CLEAR_CHAT,
} from 'actions/gameChatActions';
import {
  PERFORM_ACTION,
  NEW_ACTION,
  ACTION_REJECTED,
} from 'actions/gameActions';
import {
  mapValues,
} from 'lodash/fp';

import gameReducer from './gameReducer';

import type { Game } from './gameReducer';
import type { Action } from 'actions/types';

export type GamesState = {
  [key: GameId]: Game
};

const initialState = {};

export default function gamesReducer(state: GamesState = initialState, action: Action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
    case GAME_CREATED: {
      const { game } = action.payload;

      const gameState = {
        ...game,
        messages: [],
      };

      return {
        ...state,
        [game.id]: gameState,
      };
    }

    case GAMES_UPDATED:
    case REFRESH_LOBBY_SUCCESS: {
      const newGames = mapValues(newGameState => {
        const oldGameState = state[newGameState.id];
        return oldGameState
          ? { ...oldGameState, ...newGameState }
          : { ...newGameState, messages: [] };
      }, action.payload.games);

      return {
        ...state,
        ...newGames,
      };
    }

    case PLAYER_JOINED:
    case PLAYER_LEFT:
    case NEW_GAME_MESSAGE:
    case GAME_STARTED:
    case GAME_NOT_FOUND:
    case PERFORM_ACTION:
    case NEW_ACTION:
    case GAME_ENDED:
    case ACTION_REJECTED:
    case GAME_CANCELED:
    case UPDATE_GAME:
    case REFRESH_GAME:
    case CLEAR_CHAT: {
      const { game } = action.payload;
      return {
        ...state,
        [game.id]: gameReducer(state[game.id], action),
      };
    }

    default: return state;
  }
}
