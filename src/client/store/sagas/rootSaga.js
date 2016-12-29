import { watchLogInRequest, watchLogOut } from './loginSagas';
import { watchRegisterUser } from './registerUserSaga';

export default function* rootSaga() {
  yield [
    watchLogInRequest,
    watchLogOut,
    watchRegisterUser,
  ];
}
