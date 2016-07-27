import {
  REFRESH_LOBBY,
} from 'actions/gamesList';

const initialState = {};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LOBBY: {
      return {
        ...state,
        lastRefreshed: action.payload.refreshed,
      };
    }

    default:
      return state;
  }
}
