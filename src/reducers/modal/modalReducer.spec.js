// @flow
/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import reducer from './modalReducer';
import { expect } from 'chai';
import {
  openModal,
  closeModal,
} from 'actions/modal';
import {
  LOGIN_MODAL,
} from 'constants/modalType';

describe('modal reducer', () => {
  it('is null initially', () => {
    const initialState = reducer(undefined, { type: '@@INIT' });
    expect(initialState).to.be.null;
  });
  it('holds the type of the currently open modal', () => {
    const initialState = null;
    const state = reducer(initialState, openModal(LOGIN_MODAL));
    expect(state).to.equal(LOGIN_MODAL);
  });
  it('is back to null again closing modal', () => {
    const initialState = LOGIN_MODAL;
    const state = reducer(initialState, closeModal());
    expect(state).to.be.null;
  });
});
