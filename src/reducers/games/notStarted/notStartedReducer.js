import { OrderedSet } from 'immutable';
import {
  CREATE_GAME_SUCCESS,
  GAME_CREATED,
  REFRESH_LOBBY,
} from 'actions/gamesList';
import {
  REFRESH_GAME,
} from 'actions/gameRoom';

const initialState = new OrderedSet();

export default function notStartedReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GAME_SUCCESS:
    case GAME_CREATED:
    case REFRESH_GAME: {
      return state.add(action.payload.game.id);
    }
    case REFRESH_LOBBY: {
      const newGames = OrderedSet.fromKeys(action.payload.games);
      return state.union(newGames);
    }
    default: return state.toOrderedSet();
  }
}
