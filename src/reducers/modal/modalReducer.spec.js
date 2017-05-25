/* @flow */
/* eslint-env jest */
import reducer from './modalReducer';
import {
  openModal,
  closeModal,
} from 'actions/modalActions';
import {
  LOGIN_MODAL,
} from 'constants/modalType';

describe('modal reducer', () => {
  test('is null initially', () => {
    const initialState = reducer(undefined, { type: '@@INIT' });
    expect(initialState).toBeNull();
  });
  test('holds the type of the currently open modal', () => {
    const initialState = null;
    const state = reducer(initialState, openModal(LOGIN_MODAL));
    expect(state).toBe(LOGIN_MODAL);
  });
  test('is back to null again closing modal', () => {
    const initialState = LOGIN_MODAL;
    const state = reducer(initialState, closeModal());
    expect(state).toBeNull();
  });
});
