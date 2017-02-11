/* @flow */
/* eslint-env jest */

import usersReducer from './usersReducer';
import { logInSuccess } from 'actions/login';
import { GET_USER_DATA_SUCCESS } from 'actions/userData';
import { size } from 'lodash/fp';

describe('data/users reducer', () => {
  test('initializes to empty map', () => {
    const initialState = usersReducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual({});
  });

  test('adds user info on login', () => {
    const action = logInSuccess({
      id: '12345',
      username: 'Jack',
    });

    const initialState = {};
    const state = usersReducer(initialState, action);
    expect(state['12345'].username).toBe('Jack');
  });

  test('adds user data after fetching', () => {
    const action = {
      type: GET_USER_DATA_SUCCESS,
      payload: {
        users: {
          '1': { username: 'Jack' },
          '2': { username: 'Bob' },
        },
      },
    };

    const initialState = {};
    const state = usersReducer(initialState, action);

    expect(size(state)).toBe(2);
    expect(state['2'].username).toBe('Bob');
  });
});
