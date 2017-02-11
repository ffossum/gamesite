/* @flow */
/* eslint-env jest */
import fetch from 'isomorphic-fetch';
import { logInSaga, logOutSaga } from './loginSaga';
import { logIn, logOut, logInFailure } from 'actions/login';
import { call, put } from 'redux-saga/effects';
import { reloadPage } from 'client/util/clientUtils';

describe('login saga', () => {
  test('calls login api', () => {
    const action = logIn({
      username: 'Bob',
      password: 'hunter2',
      remember: true,
    });
    const generator = logInSaga(action);

    expect(generator.next().value).toEqual(
      call(fetch, '/api/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(action.payload),
      })
    );
  });

  test('reloads page after successful login', () => {
    const action = logIn({
      username: 'Bob',
      password: 'hunter2',
      remember: true,
    });
    const generator = logInSaga(action);
    generator.next();
    expect(generator.next({ ok: true }).value).toEqual(
      call(reloadPage)
    );
  });

  test('dispatches loginFailure action if login is not successful', () => {
    const action = logIn({
      username: 'Bob',
      password: 'hunter2',
      remember: true,
    });
    const generator = logInSaga(action);
    generator.next();
    expect(generator.next({ ok: false }).value).toEqual(
      put(logInFailure())
    );
  });
});

describe('logout saga', () => {
  test('calls logout api', () => {
    const action = logOut();
    const generator = logOutSaga(action);

    expect(generator.next().value).toEqual(
      call(fetch, '/api/logout', {
        method: 'post',
        credentials: 'same-origin',
      })
    );
  });
  test('always reloads page after', () => {
    const action = logOut();
    const generator = logOutSaga(action);

    generator.next();
    expect(generator.next().value).toEqual(
      call(reloadPage)
    );
  });
});
