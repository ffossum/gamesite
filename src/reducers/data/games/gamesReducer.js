import Immutable from 'immutable';
import {
  LOG_IN_SUCCESS,
} from 'actions/login';
import {
  CREATE_GAME_SUCCESS,
  GAME_CREATED,
  REFRESH_LOBBY,
} from 'actions/gamesList';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  REFRESH_GAME,
} from 'actions/gameRoom';
import {
  NEW_GAME_MESSAGE,
} from 'actions/gameChat';

import gameReducer from './gameReducer';

const initialState = Immutable.fromJS({});

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
    case GAME_CREATED:
    case REFRESH_GAME: {
      const { game } = action.payload;

      const gameState = Immutable.fromJS(game)
        .set('messages', Immutable.fromJS([]))
        .update('users', users => users.toSet());

      return state.set(game.id, gameState);
    }

    case LOG_IN_SUCCESS:
    case REFRESH_LOBBY: {
      let newGames = Immutable.fromJS(action.payload.games)
        .map(newGameState => newGameState.update('users', users => users.toSet()));

      newGames = newGames.map((newGameState, gameId) => {
        const gameState = state.get(gameId);
        return gameState
          ? gameState.merge(newGameState)
          : newGameState.set('messages', Immutable.fromJS([]));
      });

      return state.merge(newGames);
    }

    case PLAYER_JOINED:
    case PLAYER_LEFT:
    case NEW_GAME_MESSAGE: {
      const { game } = action.payload;
      return state.update(game.id, gameState => gameReducer(gameState, action));
    }

    default: return state;
  }
}
