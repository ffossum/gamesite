import {
  NEW_MESSAGE,
  RESET_MESSAGES,
} from 'actions/mainChat';

const initialState = [];

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_MESSAGE: {
      const newMessage = action.payload;
      return [
        ...state,
        newMessage,
      ];
    }

    case RESET_MESSAGES: {
      const newMessages = action.payload;
      return newMessages;
    }

    default:
      return state;
  }
}
