/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import loggedInUserReducer from './loggedInUserReducer';
import { logInSuccess, logOutRequest } from 'actions/login';

describe('loggedInUserReducer', () => {
  it('initializes to null', () => {
    const initialState = loggedInUserReducer(undefined, { type: 'INIT' });

    expect(initialState).to.be.null;
  });

  it('holds user id after successful login', () => {
    const action = logInSuccess({ id: '12345' });
    const initialState = null;
    const state = loggedInUserReducer(initialState, action);

    expect(state).to.equal('12345');
  });

  it('reverts back to null after logout', () => {
    const initialState = '12345';
    const state = loggedInUserReducer(initialState, logOutRequest());

    expect(state).to.be.null;
  });
});
