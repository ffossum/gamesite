import Immutable from 'immutable';
import {
  NEW_GAME_MESSAGE,
} from 'actions/gameChat';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  GAME_STARTED,
  GAME_NOT_FOUND,
} from 'actions/gameRoom';
import {
  IN_PROGRESS,
} from 'constants/gameStatus';

const initialState = Immutable.fromJS({});

export default function gameReducer(state = initialState, action) {
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
    case GAME_STARTED: {
      const { game } = action.payload;
      const message = {
        time: new Date().toJSON(),
        key: GAME_STARTED,
        args: [],
      };

      return state
        .set('status', IN_PROGRESS)
        .update('state', gameState => (game.state ? Immutable.fromJS(game.state) : gameState))
        .update('messages', messages => messages.push(Immutable.fromJS(message)));
    }
    case NEW_GAME_MESSAGE: {
      const { message } = action.payload;
      return state.update('messages', messages => messages.push(Immutable.fromJS(message)));
    }
    case GAME_NOT_FOUND: {
      return null;
    }
    default: return state;
  }
}
