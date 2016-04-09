import Immutable from 'immutable';
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
import gameReducer from '../gameReducer';

const initialState = Immutable.fromJS({});

export default function notStartedReducer(state = initialState, action) {
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
    case REFRESH_LOBBY: {
      const newGames = Immutable.fromJS(action.payload.games)
        .map(newGameState => newGameState.update('users', users => users.toSet()));

      return newGames.map((newGameState, gameId) => {
        const gameState = state.get(gameId);
        return gameState
          ? gameState.merge(newGameState)
          : newGameState.set('messages', Immutable.fromJS([]));
      });
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
