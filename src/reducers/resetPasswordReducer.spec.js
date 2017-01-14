/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import reducer from './resetPasswordReducer';
import {
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
} from 'actions/resetPasswordActions';
import { expect } from 'chai';

describe('reset password reduer', () => {
  it('is initially not pending, not successful and has no errors', () => {
    const initialState = reducer(undefined, { type: 'INIT' });

    expect(initialState).to.deep.equal({
      errors: {},
      pending: false,
      success: false,
    });
  });

  it('is pending after making request', () => {
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
    expect(state).to.deep.equal({
      errors: {},
      pending: true,
      success: false,
    });
  });

  it('clears errors and success when making request', () => {
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
    expect(state).to.deep.equal({
      errors: {},
      pending: true,
      success: false,
    });
  });

  it('is not pending, and has no errors after success', () => {
    const initialState = {
      errors: { password: 'invalid' },
      pending: true,
      success: false,
    };

    const state = reducer(initialState, resetPasswordSuccess());
    expect(state).to.deep.equal({
      errors: {},
      pending: false,
      success: true,
    });
  });

  it('is not pending, and has errors after failure', () => {
    const initialState = {
      errors: {},
      pending: true,
      success: false,
    };

    const state = reducer(initialState, resetPasswordFailure({ password: 'invalid password' }));
    expect(state).to.deep.equal({
      errors: { password: 'invalid password' },
      pending: false,
      success: false,
    });
  });
});
