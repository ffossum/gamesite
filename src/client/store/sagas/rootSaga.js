import loginSaga from './loginSaga';
import registerUserSaga from './registerUserSaga';
import userDataSaga from './userDataSaga';
import mainChatSaga from './mainChatSaga';
import lobbySaga from './lobbySaga';
import gameRoomSaga from './gameRoomSaga';
import gameChatSaga from './gameChatSaga';
import gameSaga from './gameSaga';
import forgotPasswordSaga from './forgotPasswordSaga';

export default function* rootSaga() {
  yield [
    loginSaga(),
    registerUserSaga(),
    userDataSaga(),
    mainChatSaga(),
    lobbySaga(),
    gameRoomSaga(),
    gameChatSaga(),
    gameSaga(),
    forgotPasswordSaga(),
  ];
}
