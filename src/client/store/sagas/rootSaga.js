import { watchLogInRequest, watchLogOut } from './loginSagas';
import { watchRegisterUser } from './registerUserSaga';
import { watchUserDataRequest } from './userDataSaga';
import { watchMainChatSendMessage, watchMainChatNewMessage } from './mainChatSaga';

export default function* rootSaga() {
  yield [
    watchLogInRequest,
    watchLogOut,
    watchRegisterUser,
    watchUserDataRequest,
    watchMainChatNewMessage,
    watchMainChatSendMessage,
  ];
}
