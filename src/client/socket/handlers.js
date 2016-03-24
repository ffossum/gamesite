import {
  LOG_IN_SUCCESS,
  logInSuccess,
} from 'actions/login';
import {
  NEW_MESSAGE,
  newMessage,
} from 'actions/mainChat';
import {
  GAME_CREATED,
  gameCreated,
} from 'actions/gamesList';

export function createHandlers(store) {
  return {
    news: data => {
      console.log(data);
    },
    [NEW_MESSAGE]: message => {
      store.dispatch(newMessage(message));
    },
    [LOG_IN_SUCCESS]: data => {
      store.dispatch(logInSuccess(data.user));
    },
    [GAME_CREATED]: data => {
      store.dispatch(gameCreated(data.game));
    },
  };
}
