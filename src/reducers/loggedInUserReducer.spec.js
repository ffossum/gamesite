/* eslint-env mocha */

import { expect } from 'chai';

import loggedInUserReducer from './loggedInUserReducer';


describe('loggedInUserReducer', () => {
  it('initializes to null', () => {
    const initialState = loggedInUserReducer(undefined, { type: 'INIT' });
    expect(initialState).to.be.null;
  });
});
