import {
  REFRESH_LOBBY_SUCCESS,
} from 'actions/lobbyActions';

const initialState = {};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_LOBBY_SUCCESS: {
      return {
        ...state,
        lastRefreshed: action.payload.refreshed,
      };
    }

    default:
      return state;
  }
}
