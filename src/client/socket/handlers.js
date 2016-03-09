import {
  LOG_IN_SUCCESS, logInSuccess
} from 'actions/login';
import {
  NEW_MESSAGE, newMessage
} from 'actions/mainChat';

export function createHandlers(store) {
  return {
    'news': data => {
      console.log(data);
    },
    [NEW_MESSAGE]: message => {
      store.dispatch(newMessage(message));
    },
    [LOG_IN_SUCCESS]: data => {
      store.dispatch(logInSuccess(data.user));
    }
  };
}
