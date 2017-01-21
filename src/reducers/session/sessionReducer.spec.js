// @flow
/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import sessionReducer from './sessionReducer';
import { logInSuccess, logOut } from 'actions/login';

describe('session reducer', () => {
  it('initializes userId to null', () => {
    const initialState = sessionReducer(undefined, { type: '@@INIT' });

    expect(initialState.userId).to.be.null;
  });

  it('holds user id after successful login', () => {
    const action = logInSuccess({ id: '12345' });
    const initialState = {
      userId: null,
    };
    const state = sessionReducer(initialState, action);

    expect(state.userId).to.equal('12345');
  });

  it('reverts back to null after logout', () => {
    const initialState = {
      userId: '12345',
    };
    const state = sessionReducer(initialState, logOut());

    expect(state.userId).to.be.null;
  });
});
