import Immutable from 'immutable';
import {
  GAME_CREATED,
  REFRESH_LOBBY,
} from 'actions/gamesList';

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
    default: return state;
  }
}
