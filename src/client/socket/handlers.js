import {
  LOG_IN_SUCCESS, logInSuccess
} from 'actions/login';

export function createHandlers(store) {
  return {
    'news': data => {
      console.log(data);
    },
    [LOG_IN_SUCCESS]: data => {
      store.dispatch(logInSuccess(data.user));
    }
  };
}
