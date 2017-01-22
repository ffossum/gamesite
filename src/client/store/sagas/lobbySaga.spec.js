/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { call, put, select } from 'redux-saga/effects';
import { expect } from 'chai';
import {
  refreshLobbySaga,
  joinLobbySaga,
  leaveLobbySaga,
  createGameSaga,
  gameCreatedSaga,
} from './lobbySaga';
import {
  refreshLobby,
  refreshLobbySuccess,
  joinLobby,
  createGame,
  createGameSuccess,
  gameCreated,
} from 'actions/lobbyActions';
import { getUserData } from 'actions/userData';
import { userIdSelector } from 'selectors/commonSelectors';
import socket from 'client/socket';

describe('lobby saga', () => {
  it('fetches user data when lobby is refreshed', () => {
    const games = {
      game1: {
        id: 'game1',
        users: ['user1', 'user2'],
      },
    };
    const refreshed = new Date().toJSON();
    const action = refreshLobby({
      games,
      refreshed,
    });
    const generator = refreshLobbySaga(action);
    expect(generator.next().value).to.deep.equal(
      put(getUserData('user1', 'user2'))
    );
    expect(generator.next().value).to.deep.equal(
      put(refreshLobbySuccess({ games, refreshed }))
    );
  });

  it('refreshes lobby and subscribes to lobby events when user enters lobby', () => {
    const action = joinLobby();
    const generator = joinLobbySaga(action);

    expect(generator.next().value).to.deep.equal(
      call(socket.rpc, action.type)
    );

    const refreshed = new Date().toJSON();
    const games = { game1: { id: 'game1' } };
    expect(generator.next({ games, refreshed }).value).to.deep.equal(
      put(refreshLobby({ games, refreshed }))
    );

    expect(generator.next().value).to.deep.equal(
      call(socket.subscribe, 'lobby')
    );
  });

  it('unsubscribes to lobby events when user leaves lobby', () => {
    const generator = leaveLobbySaga();
    expect(generator.next().value).to.deep.equal(
      call(socket.unsubscribe, 'lobby')
    );
  });

  describe('game creation request', () => {
    it('is sent to server if user is logged in', () => {
      const action = createGame({ comment: 'hello' });
      const generator = createGameSaga(action);
      expect(generator.next().value).to.deep.equal(
        select(userIdSelector)
      );
      expect(generator.next('user id').value).to.deep.equal(
        call(socket.rpc, action.type, {
          game: { comment: 'hello' },
          user: { id: 'user id' },
        })
      );
      const createdGame = {
        comment: 'hello',
        id: 'game id',
      };
      expect(generator.next(createdGame).value).to.deep.equal(
        put(createGameSuccess(createdGame))
      );
    });

    it('is not sent if user is not logged in', () => {
      const action = createGame({ comment: 'hello' });
      const generator = createGameSaga(action);
      generator.next();
      expect(generator.next(null).value).to.be.undefined;
    });
  });

  it('fetches user data when a new game appears', () => {
    const action = gameCreated({ id: 'game id', users: ['a', 'b'] });
    const generator = gameCreatedSaga(action);
    expect(generator.next().value).to.deep.equal(
      put(getUserData('a', 'b'))
    );
  });
});
