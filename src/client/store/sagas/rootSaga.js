import { watchLogInRequest, watchLogOut } from './loginSagas';
import { watchRegisterUser } from './registerUserSaga';
import { watchUserDataRequest } from './userDataSaga';
import { watchMainChatSendMessage, watchMainChatNewMessage } from './mainChatSaga';
import { watchJoinLobby, watchLeaveLobby, watchRefreshLobby } from './lobbySaga';

export default function* rootSaga() {
  yield [
    watchLogInRequest,
    watchLogOut,
    watchRegisterUser,
    watchUserDataRequest,
    watchMainChatNewMessage,
    watchMainChatSendMessage,
    watchJoinLobby,
    watchLeaveLobby,
    watchRefreshLobby,
  ];
}
