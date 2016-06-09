import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from 'actions/modal';
import {
  LOG_IN_SUCCESS,
} from 'actions/login';

const initialState = null;

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: return action.payload.modalType;

    case CLOSE_MODAL:
    case LOG_IN_SUCCESS:
      return initialState;

    default: return state;
  }
}
