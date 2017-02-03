/* @flow */
/* eslint-env mocha */
import {
  getUserData,
  getUserDataSuccess,
} from 'actions/userData';
import { createGetUserDataSaga } from './userDataSaga';
import { expect } from 'chai';
import { userDataSelector } from 'selectors/commonSelectors';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

describe('get user data saga', () => {
  it('does nothing if user data is already available', () => {
    const getUserDataSaga = createGetUserDataSaga();
    const action = getUserData('userA', 'userB');
    const generator = getUserDataSaga(action);

    expect(generator.next().value).to.deep.equal(
      select(userDataSelector)
    );

    const existingUserData = {
      userA: { id: 'userA' },
      userB: { id: 'userB' },
    };

    expect(generator.next(existingUserData).value).to.be.undefined;
  });

  it('fetches user data if needed', () => {
    const getUserDataSaga = createGetUserDataSaga();
    const action = getUserData('userA', 'userB');
    const generator = getUserDataSaga(action);
    generator.next();
    const existingUserData = {};

    expect(generator.next(existingUserData).value).to.deep.equal(
      call(fetch, '/api/users?id=userA,userB')
    );
  });

  it('does nothing if requested user data is already being fetched', () => {
    const getUserDataSaga = createGetUserDataSaga();
    const action = getUserData('userA', 'userB');
    const existingUserData = {};

    const generator1 = getUserDataSaga(action);
    generator1.next();
    generator1.next(existingUserData);

    const generator2 = getUserDataSaga(action);
    generator2.next();

    expect(generator2.next(existingUserData).value).to.be.undefined;
  });

  it('puts success action if fetch is successful', () => {
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
        userA: { id: 'userA' },
        userB: { id: 'userB' },
      },
    };
    expect(generator.next(json).value).to.deep.equal(
      put(getUserDataSuccess(json.users)),
    );
  });
});
