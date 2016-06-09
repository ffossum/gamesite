export const OPEN_MODAL = 'modal/OPEN';
export const CLOSE_MODAL = 'modal/CLOSE';

export function openModal(modalType) {
  return {
    type: OPEN_MODAL,
    payload: {
      modalType,
    },
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export default {
  openModal,
  closeModal,
};
