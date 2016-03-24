import Immutable from 'immutable';
import {
  GAME_CREATED,
} from 'actions/gamesList';

const initialState = Immutable.fromJS({});

export default function notStartedReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_CREATED: {
      const { game } = action.payload;
      return state.set(game.id, Immutable.fromJS(game));
    }
    default: return state;
  }
}
