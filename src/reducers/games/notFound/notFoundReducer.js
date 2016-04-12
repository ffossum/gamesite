import { Set } from 'immutable';
import {
  GAME_NOT_FOUND,
} from 'actions/gameRoom';

const initialState = new Set();

export default function notFoundReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_NOT_FOUND: {
      return state.add(action.payload.game.id);
    }
    default: return state.toSet();
  }
}
