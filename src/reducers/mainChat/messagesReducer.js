import {NEW_MESSAGE} from 'actions/mainChat';
import Immutable from 'immutable';

const initialState = Immutable.fromJS([]);

export default function(state = initialState, action) {
  switch(action.type) {
    case NEW_MESSAGE: {
      const newMessage = Immutable.fromJS(action.payload);
      return state.push(newMessage);
    }
  }
  return state;
}
