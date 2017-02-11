/* @flow */
/* eslint-env jest */
import reducer from './modalReducer';
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
    expect(initialState).toBeNull();
  });
  it('holds the type of the currently open modal', () => {
    const initialState = null;
    const state = reducer(initialState, openModal(LOGIN_MODAL));
    expect(state).toBe(LOGIN_MODAL);
  });
  it('is back to null again closing modal', () => {
    const initialState = LOGIN_MODAL;
    const state = reducer(initialState, closeModal());
    expect(state).toBeNull();
  });
});
