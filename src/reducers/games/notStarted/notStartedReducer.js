import Immutable from 'immutable';
import {
  GAME_CREATED,
  REFRESH_LOBBY,
} from 'actions/gamesList';
import {
  JOIN_GAME_SUCCESS,
} from 'actions/gameRoom';

const initialState = Immutable.fromJS({});

export default function notStartedReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_CREATED: {
      const { game } = action.payload;
      return state.set(game.id, Immutable.fromJS(game));
    }
    case REFRESH_LOBBY: {
      return Immutable.fromJS(action.payload.games);
    }
    case JOIN_GAME_SUCCESS: {
      const { game, user } = action.payload;
      return state.updateIn([game.id, 'users'], users => users.push(user.id));
    }
    default: return state;
  }
}
