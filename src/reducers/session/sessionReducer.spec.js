// @flow
/* eslint-env jest */
import sessionReducer from './sessionReducer';
import { logInSuccess, logOut } from 'actions/login';

describe('session reducer', () => {
  it('initializes userId to null', () => {
    const initialState = sessionReducer(undefined, { type: '@@INIT' });

    expect(initialState.userId).toBe(null);
  });

  it('holds user id after successful login', () => {
    const action = logInSuccess({ id: '12345' });
    const initialState = {
      userId: null,
    };
    const state = sessionReducer(initialState, action);

    expect(state.userId).toBe('12345');
  });

  it('reverts back to null after logout', () => {
    const initialState = {
      userId: '12345',
    };
    const state = sessionReducer(initialState, logOut());

    expect(state.userId).toBe(null);
  });
});
