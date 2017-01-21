// @flow
import type { ModalType } from '../constants/modalType';
import type { Action } from './types';

type OpenModalActionType = 'modal: open';
type CloseModalActionType = 'modal: close';

type OpenModalAction = {
  type: OpenModalActionType,
  payload: {
    modalType: ModalType,
  }
}
type CloseModalAction = {
  type: CloseModalActionType,
}
export type ModalAction =
  | OpenModalAction
  | CloseModalAction
  ;

export const OPEN_MODAL: OpenModalActionType = 'modal: open';
export const CLOSE_MODAL: CloseModalActionType = 'modal: close';

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
