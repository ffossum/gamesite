/* @flow */
/* eslint-env jest */
import {
  getUserData,
  getUserDataSuccess,
} from 'actions/userData';
import { createGetUserDataSaga } from './userDataSaga';
import { userDataSelector } from 'selectors/commonSelectors';
import { call, put, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

describe('get user data saga', () => {
  test('does nothing if user data is already available', () => {
    const getUserDataSaga = createGetUserDataSaga();
    const action = getUserData('userA', 'userB');
    const generator = getUserDataSaga(action);

    expect(generator.next().value).toEqual(
      select(userDataSelector)
    );

    const existingUserData = {
      userA: { id: 'userA' },
      userB: { id: 'userB' },
    };

    expect(generator.next(existingUserData).value).toBe(undefined);
  });

  test('fetches user data if needed', () => {
    const getUserDataSaga = createGetUserDataSaga();
    const action = getUserData('userA', 'userB');
    const generator = getUserDataSaga(action);
    generator.next();
    const existingUserData = {};

    expect(generator.next(existingUserData).value).toEqual(
      call(fetch, '/api/users?id=userA,userB')
    );
  });

  test('does nothing if requested user data is already being fetched', () => {
    const getUserDataSaga = createGetUserDataSaga();
    const action = getUserData('userA', 'userB');
    const existingUserData = {};

    const generator1 = getUserDataSaga(action);
    generator1.next();
    generator1.next(existingUserData);

    const generator2 = getUserDataSaga(action);
    generator2.next();

    expect(generator2.next(existingUserData).value).toBe(undefined);
  });

  test('puts success action if fetch is successful', () => {
    const getUserDataSaga = createGetUserDataSaga();
    const action = getUserData('userA', 'userB');
    const generator = getUserDataSaga(action);
    generator.next();

    const existingUserData = {};
    generator.next(existingUserData);

    const fetchResponse = { ok: true, json: () => {} };
    generator.next(fetchResponse);

    const json = {
      users: {
        userA: { id: 'userA', emailHash: '#', username: 'A' },
        userB: { id: 'userB', emailHash: '#', username: 'B' },
      },
    };
    expect(generator.next(json).value).toEqual(
      put(getUserDataSuccess(json.users)),
    );
  });
});
