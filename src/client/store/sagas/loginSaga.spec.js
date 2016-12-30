/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import fetch from 'isomorphic-fetch';
import { logInSaga, logOutSaga } from './loginSaga';
import { logIn, logOut, logInFailure } from 'actions/login';
import { call, put } from 'redux-saga/effects';
import { expect } from 'chai';
import { reloadPage } from 'client/util/clientUtils';

describe('login saga', () => {
  it('calls login api', () => {
    const action = logIn('Bob', 'hunter2');
    const generator = logInSaga(action);

    expect(generator.next().value).to.deep.equal(
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

  it('reloads page after successful login', () => {
    const action = logIn('Bob', 'hunter2');
    const generator = logInSaga(action);
    generator.next();
    expect(generator.next({ ok: true }).value).to.deep.equal(
      call(reloadPage)
    );
  });

  it('dispatches loginFailure action if login is not successful', () => {
    const action = logIn('Bob', 'hunter2');
    const generator = logInSaga(action);
    generator.next();
    expect(generator.next({ ok: false }).value).to.deep.equal(
      put(logInFailure())
    );
  });
});

describe('logout saga', () => {
  it('calls logout api', () => {
    const action = logOut();
    const generator = logOutSaga(action);

    expect(generator.next().value).to.deep.equal(
      call(fetch, '/api/logout', {
        method: 'post',
        credentials: 'same-origin',
      })
    );
  });
  it('always reloads page after', () => {
    const action = logOut();
    const generator = logOutSaga(action);

    generator.next();
    expect(generator.next().value).to.deep.equal(
      call(reloadPage)
    );
  });
});
