import {
  REFRESH_LOBBY,
} from 'actions/gamesList';
import Immutable from 'immutable';
import { chain, isEmpty } from 'lodash';

const initialState = Immutable.fromJS({});

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LOBBY: {
      if (isEmpty(action.payload.games)) {
        return state;
      }
      const lastUpdated = chain(action.payload.games)
        .map(game => game.updated)
        .max()
        .value();

      return state.set('lastUpdated', lastUpdated);
    }

    default:
      return state;
  }
}
