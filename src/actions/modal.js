// @flow
import type { ModalType } from '../constants/modalType';
import type { Action } from './types';

export const OPEN_MODAL = 'modal/OPEN';
export const CLOSE_MODAL = 'modal/CLOSE';

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
