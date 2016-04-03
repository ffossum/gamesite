import Immutable from 'immutable';
import {
  NEW_GAME_MESSAGE,
} from 'actions/gameChat';

const initialState = Immutable.fromJS({});

export default function notStartedReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_GAME_MESSAGE: {
      const { message } = action.payload;
      return state.update('messages', messages => messages.push(Immutable.fromJS(message)));
    }
    default: return state;
  }
}
