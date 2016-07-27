import {
  REFRESH_LOBBY,
} from 'actions/gamesList';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LOBBY: {
      return state.set('lastRefreshed', action.payload.refreshed);
    }

    default:
      return state;
  }
}
