import {
  LOG_IN_SUCCESS,
} from 'actions/login';
import {
  CREATE_GAME_SUCCESS,
  GAME_CREATED,
  REFRESH_LOBBY,
  UPDATE_GAME,
} from 'actions/gamesList';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  REFRESH_GAME,
  GAME_STARTED,
  GAME_NOT_FOUND,
  GAME_ENDED,
  GAME_CANCELED,
} from 'actions/gameRoom';
import {
  NEW_GAME_MESSAGE,
  CLEAR_CHAT,
} from 'actions/gameChat';
import {
  PERFORM_ACTION,
  NEW_ACTION,
  ACTION_REJECTED,
} from 'actions/game';
import {
  mapValues,
} from 'lodash';

import gameReducer from './gameReducer';

const initialState = {};

export default function gamesReducer(state = initialState, action) {
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

    case LOG_IN_SUCCESS:
    case REFRESH_LOBBY: {
      const newGames = mapValues(action.payload.games, (newGameState, gameId) => {
        const oldGameState = state[gameId];
        return oldGameState
          ? { ...oldGameState, ...newGameState }
          : { ...newGameState, messages: [] };
      });

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
