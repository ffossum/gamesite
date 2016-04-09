import Immutable from 'immutable';
import {
  NEW_GAME_MESSAGE,
} from 'actions/gameChat';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
} from 'actions/gameRoom';

const initialState = Immutable.fromJS({});

export default function notStartedReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_JOINED: {
      const { user } = action.payload;

      const message = {
        time: new Date().toJSON(),
        key: PLAYER_JOINED,
        args: [
          { user: user.id },
        ],
      };

      return state
        .update('users', users => users.add(user.id))
        .update('messages', messages => messages.push(Immutable.fromJS(message)));
    }
    case PLAYER_LEFT: {
      const { user } = action.payload;

      const message = {
        time: new Date().toJSON(),
        key: PLAYER_LEFT,
        args: [
          { user: user.id },
        ],
      };

      return state
        .update('users', users => users.delete(user.id))
        .update('messages', messages => messages.push(Immutable.fromJS(message)));
    }
    case NEW_GAME_MESSAGE: {
      const { message } = action.payload;
      return state.update('messages', messages => messages.push(Immutable.fromJS(message)));
    }
    default: return state;
  }
}
