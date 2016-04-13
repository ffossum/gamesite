/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import { Map } from 'immutable';
import usersReducer from './usersReducer';
import { logInSuccess } from 'actions/login';
import { GET_USER_DATA } from 'actions/userData';

describe('data/users reducer', () => {
  it('initializes to empty map', () => {
    const initialState = usersReducer(undefined, { type: '@@INIT' });
    expect(initialState.toJS()).to.be.empty;
  });

  it('adds user info on login', () => {
    const action = logInSuccess({
      id: '12345',
      username: 'Jack',
    });

    const initialState = new Map();
    const state = usersReducer(initialState, action);
    expect(state.getIn(['12345', 'username'])).to.equal('Jack');
  });

  it('adds user data after fetching', () => {
    const action = {
      type: GET_USER_DATA,
      payload: {
        users: {
          1: { username: 'Jack' },
          2: { username: 'Bob' },
        },
      },
    };

    const initialState = new Map();
    const state = usersReducer(initialState, action);

    expect(state.size).to.equal(2);
    expect(state.getIn(['2', 'username'])).to.equal('Bob');
  });
});
