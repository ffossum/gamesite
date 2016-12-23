import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from 'actions/modal';

const initialState = null;

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: return action.payload.modalType;

    case CLOSE_MODAL:
      return initialState;

    default: return state;
  }
}
