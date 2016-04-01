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
  NEW_MESSAGE,
} from 'actions/gameChat';
import gameReducer from '../gameReducer';

const initialState = Immutable.fromJS({});

export default function notStartedReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
    case GAME_CREATED:
    case REFRESH_GAME: {
      const { game } = action.payload;
      return state.set(game.id, Immutable.fromJS(game));
    }
    case REFRESH_LOBBY: {
      return Immutable.fromJS(action.payload.games);
    }
    case PLAYER_JOINED:
    case JOIN_GAME_SUCCESS: {
      const { game, user } = action.payload;
      return state.updateIn([game.id, 'users'], users => users.push(user.id));
    }
    case NEW_MESSAGE: {
      const { gameId } = action.payload;
      return state.update(gameId, game => gameReducer(game, action));
    }
    default: return state;
  }
}
