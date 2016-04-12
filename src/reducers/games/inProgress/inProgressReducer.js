import { Set } from 'immutable';

const initialState = new Set();

export default function inProgressReducer(state = initialState, action) {
  switch (action.type) {
    default: return state.toSet();
  }
}
