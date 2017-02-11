/* eslint-env jest */
import { call, put, select } from 'redux-saga/effects';
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
  test('fetches user data when lobby is refreshed', () => {
    const games = {
      game1: {
        id: 'game1',
        users: ['user1', 'user2'],
      },
    };

    const action = refreshLobby({
      games,
    });
    const generator = refreshLobbySaga(action);
    expect(generator.next().value).toEqual(
      put(getUserData('user1', 'user2'))
    );
    expect(generator.next().value).toEqual(
      put(refreshLobbySuccess({ games }))
    );
  });

  test('refreshes lobby and subscribes to lobby events when user enters lobby', () => {
    const action = joinLobby();
    const generator = joinLobbySaga(action);

    expect(generator.next().value).toEqual(
      call(socket.rpc, action.type)
    );

    const games = { game1: { id: 'game1' } };
    expect(generator.next({ games }).value).toEqual(
      put(refreshLobby({ games }))
    );

    expect(generator.next().value).toEqual(
      call(socket.subscribe, 'lobby')
    );
  });

  test('unsubscribes to lobby events when user leaves lobby', () => {
    const generator = leaveLobbySaga();
    expect(generator.next().value).toEqual(
      call(socket.unsubscribe, 'lobby')
    );
  });

  describe('game creation request', () => {
    test('is sent to server if user is logged in', () => {
      const action = createGame({ comment: 'hello' });
      const generator = createGameSaga(action);
      expect(generator.next().value).toEqual(
        select(userIdSelector)
      );
      expect(generator.next('user id').value).toEqual(
        call(socket.rpc, action.type, {
          game: { comment: 'hello' },
          user: { id: 'user id' },
        })
      );
      const createdGame = {
        comment: 'hello',
        id: 'game id',
      };
      expect(generator.next(createdGame).value).toEqual(
        put(createGameSuccess(createdGame))
      );
    });

    test('is not sent if user is not logged in', () => {
      const action = createGame({ comment: 'hello' });
      const generator = createGameSaga(action);
      generator.next();
      expect(generator.next(null).value).toBeUndefined();
    });
  });

  test('fetches user data when a new game appears', () => {
    const action = gameCreated({ id: 'game id', users: ['a', 'b'] });
    const generator = gameCreatedSaga(action);
    expect(generator.next().value).toEqual(
      put(getUserData('a', 'b'))
    );
  });
});
