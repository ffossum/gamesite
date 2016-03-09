import {NEW_MESSAGE} from 'actions/mainChat';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case NEW_MESSAGE: return [...state, action.payload];
  }
  return state;
}
