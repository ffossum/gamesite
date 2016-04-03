import Immutable from 'immutable';
import {
  GAME_NOT_FOUND,
} from 'actions/gameRoom';

const initialState = Immutable.fromJS({});

export default function notFoundReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_NOT_FOUND: {
      const { game } = action.payload;
      return state.set(game.id, null);
    }
    default: return state;
  }
}
