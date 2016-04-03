import Immutable from 'immutable';
import {
  CREATE_GAME_SUCCESS,
  GAME_CREATED,
  REFRESH_LOBBY,
} from 'actions/gamesList';
import {
  JOIN_GAME_SUCCESS,
  PLAYER_JOINED,
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

      let gameState = Immutable.fromJS(game);
      gameState = gameState.set('messages', Immutable.fromJS([]));
      return state.set(game.id, gameState);
    }
    case REFRESH_LOBBY: {
      const newGames = Immutable.fromJS(action.payload.games);
      return newGames.map((newGameState, gameId) => {
        const gameState = state.get(gameId);
        return gameState
          ? gameState.merge(newGameState)
          : newGameState.set('messages', Immutable.fromJS([]));
      });
    }
    case PLAYER_JOINED:
    case JOIN_GAME_SUCCESS: {
      const { game, user } = action.payload;
      return state.updateIn([game.id, 'users'], users => users.push(user.id));
    }
    case NEW_GAME_MESSAGE: {
      const { gameId } = action.payload;
      return state.update(gameId, game => gameReducer(game, action));
    }
    default: return state;
  }
}
