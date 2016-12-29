import { watchLogInRequest, watchLogOut } from './loginSagas';

export default function* rootSaga() {
  yield [
    watchLogInRequest,
    watchLogOut,
  ];
}
