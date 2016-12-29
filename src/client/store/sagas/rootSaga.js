import { watchLogInRequest, watchLogOut } from './loginSagas';
import { watchRegisterUser } from './registerUserSaga';
import { watchUserDataRequest } from './userDataSaga';

export default function* rootSaga() {
  yield [
    watchLogInRequest,
    watchLogOut,
    watchRegisterUser,
    watchUserDataRequest,
  ];
}
