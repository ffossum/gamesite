/* eslint-env jest */
import {
  PLAYER_JOINED, playerJoined,
  PLAYER_LEFT, playerLeft,
} from 'actions/gameRoom';
import gameReducer from './gameReducer';

describe('data/games/[gameId] reducer', () => {
  describe('when player joins game', () => {
    const initialState = {
      users: ['a'],
      messages: [],
    };

    test('adds new player to user list', () => {
      const action = playerJoined('gameId', 'b');
      const state = gameReducer(initialState, action);
      expect(state.users.length).toBe(2);
      expect(state.users).toContain('b');
    });

    test('adds informative message', () => {
      const action = playerJoined('gameId', 'b');
      const state = gameReducer(initialState, action);
      expect(state.messages.length).toBe(1);
      expect(state.messages[0].key).toBe(PLAYER_JOINED);
    });

    test('does not add existing player', () => {
      const action = playerJoined('gameId', 'a');
      const state = gameReducer(initialState, action);
      expect(state.users.length).toBe(1);
      expect(state.users).toContain('a');
      expect(state.messages.length).toBe(0);
    });
  });

  describe('when player leaves game', () => {
    const initialState = {
      users: ['a', 'b'],
      messages: [],
    };

    test('it removes player from users list', () => {
      const action = playerLeft('gameId', 'a');
      const state = gameReducer(initialState, action);
      expect(state.users.length).toBe(1);
      expect(state.users).not.toContain('a');
    });

    test('adds informative message', () => {
      const action = playerLeft('gameId', 'a');
      const state = gameReducer(initialState, action);
      expect(state.messages.length).toBe(1);
      expect(state.messages[0].key).toBe(PLAYER_LEFT);
    });
  });
});
