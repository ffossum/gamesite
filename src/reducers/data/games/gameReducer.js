import {
  NEW_GAME_MESSAGE,
  CLEAR_CHAT,
} from 'actions/gameChat';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
  GAME_STARTED,
  GAME_NOT_FOUND,
  GAME_ENDED,
  GAME_CANCELED,
  REFRESH_GAME,
} from 'actions/gameRoom';
import {
  IN_PROGRESS,
  ENDED,
  CANCELED,
} from 'constants/gameStatus';
import { UPDATE_GAME } from 'actions/gamesList';
import {
  PERFORM_ACTION,
  NEW_ACTION,
  ACTION_REJECTED,
} from 'actions/game';
import {
  cloneDeep,
  union,
  without,
} from 'lodash';
import jsonpatch from 'fast-json-patch';

const initialState = {};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_GAME: {
      const { game } = action.payload;
      return {
        ...game,
        messages: state.messages || [],
      };
    }
    case CLEAR_CHAT: {
      return {
        ...state,
        messages: [],
      };
    }
    case UPDATE_GAME: {
      return {
        ...state,
        ...action.payload.game,
      };
    }
    case PLAYER_JOINED: {
      const { user } = action.payload;

      const message = {
        time: new Date().toJSON(),
        key: PLAYER_JOINED,
        args: [
          { user: user.id },
        ],
      };

      return {
        ...state,
        users: union(state.users, [user.id]),
        messages: [
          ...state.messages,
          message,
        ],
      };
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

      return {
        ...state,
        users: without(state.users, user.id),
        messages: [
          ...state.messages,
          message,
        ],
      };
    }
    case GAME_STARTED: {
      const { game } = action.payload;
      const message = {
        time: new Date().toJSON(),
        key: GAME_STARTED,
        args: [],
      };

      return {
        ...state,
        status: IN_PROGRESS,
        state: game.state || state.state,
        messages: [
          ...state.messages,
          message,
        ],
      };
    }
    case NEW_GAME_MESSAGE: {
      const { message } = action.payload;
      return {
        ...state,
        messages: [
          ...state.messages,
          message,
        ],
      };
    }
    case GAME_NOT_FOUND: {
      return null;
    }
    case GAME_CANCELED: {
      const { game } = action.payload;
      return {
        id: game.id,
        users: [],
        status: CANCELED,
      };
    }
    case PERFORM_ACTION: {
      return {
        ...state,
        waitingForServer: true,
      };
    }
    case ACTION_REJECTED: {
      const newState = {
        ...state,
      };
      delete newState.waitingForServer;
      return newState;
    }
    case NEW_ACTION: {
      const patch = action.payload.patch;
      const gameState = cloneDeep(state.state);
      jsonpatch.apply(gameState, patch);

      const newState = {
        ...state,
        state: gameState,
      };
      delete newState.waitingForServer;

      return newState;
    }
    case GAME_ENDED: {
      const message = {
        time: new Date().toJSON(),
        key: GAME_ENDED,
        args: [],
      };

      return {
        ...state,
        status: ENDED,
        messages: [
          ...state.messages,
          message,
        ],
      };
    }
    default: return state;
  }
}
