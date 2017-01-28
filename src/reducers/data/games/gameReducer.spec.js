/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import {
  PLAYER_JOINED, playerJoined,
  PLAYER_LEFT, playerLeft,
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
      const action = playerJoined('gameId', 'b');
      const state = gameReducer(initialState, action);
      expect(state.users.length).to.equal(2);
      expect(state.users).to.include('b');
    });

    it('adds informative message', () => {
      const action = playerJoined('gameId', 'b');
      const state = gameReducer(initialState, action);
      expect(state.messages.length).to.equal(1);
      expect(state.messages[0].key).to.equal(PLAYER_JOINED);
    });

    it('does not add existing player', () => {
      const action = playerJoined('gameId', 'a');
      const state = gameReducer(initialState, action);
      expect(state.users.length).to.equal(1);
      expect(state.users).to.include('a');
      expect(state.messages.length).to.equal(0);
    });
  });

  describe('when player leaves game', () => {
    const initialState = {
      users: ['a', 'b'],
      messages: [],
    };

    it('it removes player from users list', () => {
      const action = playerLeft('gameId', 'a');
      const state = gameReducer(initialState, action);
      expect(state.users.length).to.equal(1);
      expect(state.users).not.to.include('a');
    });

    it('adds informative message', () => {
      const action = playerLeft('gameId', 'a');
      const state = gameReducer(initialState, action);
      expect(state.messages.length).to.equal(1);
      expect(state.messages[0].key).to.equal(PLAYER_LEFT);
    });
  });
});
