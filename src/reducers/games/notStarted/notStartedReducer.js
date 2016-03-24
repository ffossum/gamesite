import Immutable from 'immutable';
import {
  CREATE_GAME_SUCCESS,
} from 'actions/gamesList';

const initialState = Immutable.fromJS({});

export default function notStartedReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS: {
      const { game } = action.payload;
      return state.set(game.id, Immutable.fromJS(game));
    }
    default: return state;
  }
}
