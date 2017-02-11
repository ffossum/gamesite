/* @flow */
/* eslint-env jest */
import reducer from './resetPasswordReducer';
import {
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
} from 'actions/resetPasswordActions';

describe('reset password reduer', () => {
  test('is initially not pending, not successful and has no errors', () => {
    const initialState = reducer(undefined, { type: 'INIT' });

    expect(initialState).toEqual({
      errors: {},
      pending: false,
      success: false,
    });
  });

  test('is pending after making request', () => {
    const initialState = {
      errors: {},
      pending: false,
      success: false,
    };

    const state = reducer(initialState, resetPassword({
      userId: '1234',
      token: 'abcdef',
      password: 'hunter2',
      repeatPassword: 'hunter2',
    }));
    expect(state).toEqual({
      errors: {},
      pending: true,
      success: false,
    });
  });

  test('clears errors and success when making request', () => {
    const initialState = {
      errors: { password: 'invalid' },
      pending: false,
      success: true,
    };

    const state = reducer(initialState, resetPassword({
      userId: '1234',
      token: 'abcdef',
      password: 'hunter2',
      repeatPassword: 'hunter2',
    }));
    expect(state).toEqual({
      errors: {},
      pending: true,
      success: false,
    });
  });

  test('is not pending, and has no errors after success', () => {
    const initialState = {
      errors: { password: 'invalid' },
      pending: true,
      success: false,
    };

    const state = reducer(initialState, resetPasswordSuccess());
    expect(state).toEqual({
      errors: {},
      pending: false,
      success: true,
    });
  });

  test('is not pending, and has errors after failure', () => {
    const initialState = {
      errors: {},
      pending: true,
      success: false,
    };

    const state = reducer(initialState, resetPasswordFailure({ password: 'invalid password' }));
    expect(state).toEqual({
      errors: { password: 'invalid password' },
      pending: false,
      success: false,
    });
  });
});
