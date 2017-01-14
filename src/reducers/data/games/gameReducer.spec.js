/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import {
  PLAYER_JOINED,
  PLAYER_LEFT,
} from 'actions/gameRoom';
import gameReducer from './gameReducer';

describe('data/games/[gameId] reducer', () => {
  it('initializes to empty object', () => {
    const initialState = gameReducer(undefined, { type: '@@INIT' });
    expect(initialState).to.be.empty;
  });

  describe('when player joins game', () => {
    const initialState = {
      users: ['a'],
      messages: [],
    };

    it('adds new player to user list', () => {
      const action = {
        type: PLAYER_JOINED,
        payload: {
          game: { id: 'gameId' },
          user: { id: 'b' },
        },
      };
      const state = gameReducer(initialState, action);
      expect(state.users.length).to.equal(2);
      expect(state.users).to.include('b');
    });

    it('does not add existing player', () => {
      const action = {
        type: PLAYER_JOINED,
        payload: {
          game: { id: 'gameId' },
          user: { id: 'a' },
        },
      };
      const state = gameReducer(initialState, action);
      expect(state.users.length).to.equal(1);
      expect(state.users).to.include('a');
    });

    it('adds informative message', () => {
      const action = {
        type: PLAYER_JOINED,
        payload: {
          game: { id: 'gameId' },
          user: { id: 'b' },
        },
      };
      const state = gameReducer(initialState, action);
      expect(state.messages.length).to.equal(1);
      expect(state.messages[0].key).to.equal(PLAYER_JOINED);
    });
  });

  describe('when player leaves game', () => {
    const initialState = {
      users: ['a', 'b'],
      messages: [],
    };

    it('it removes player from users list', () => {
      const action = {
        type: PLAYER_LEFT,
        payload: {
          game: { id: 'gameId' },
          user: { id: 'a' },
        },
      };
      const state = gameReducer(initialState, action);
      expect(state.users.length).to.equal(1);
      expect(state.users).not.to.include('a');
    });

    it('adds informative message', () => {
      const action = {
        type: PLAYER_LEFT,
        payload: {
          game: { id: 'gameId' },
          user: { id: 'a' },
        },
      };
      const state = gameReducer(initialState, action);
      expect(state.messages.length).to.equal(1);
      expect(state.messages[0].key).to.equal(PLAYER_LEFT);
    });
  });
});
