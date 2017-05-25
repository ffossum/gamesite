/* @flow */
import type { ModalType } from '../constants/modalType';
import type { Action } from './types';

export const OPEN_MODAL = 'modal: open';
export const CLOSE_MODAL = 'modal: close';

type OpenModalAction = {
  type: 'modal: open',
  payload: {
    modalType: ModalType,
  }
}
type CloseModalAction = {
  type: 'modal: close',
}
export type ModalAction =
  | OpenModalAction
  | CloseModalAction
  ;

export function openModal(modalType: ModalType): Action {
  return {
    type: OPEN_MODAL,
    payload: {
      modalType,
    },
  };
}

export function closeModal(): Action {
  return {
    type: CLOSE_MODAL,
  };
}

export default {
  openModal,
  closeModal,
};
