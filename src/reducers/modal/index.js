// @flow
import type { ModalType } from 'constants/modalType';
import type { Action } from 'actions/types';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from 'actions/modal';

export type ModalState = ModalType | null;

const initialState = null;

export default function modalReducer(
  state: ModalState = initialState,
  action: Action): ModalState {

  switch (action.type) {
    case OPEN_MODAL: return action.payload.modalType;
    case CLOSE_MODAL: return initialState;

    default: return state;
  }
}
