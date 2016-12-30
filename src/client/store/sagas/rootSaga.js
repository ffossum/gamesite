import loginSaga from './loginSaga';
import registerUserSaga from './registerUserSaga';
import userDataSaga from './userDataSaga';
import mainChatSaga from './mainChatSaga';
import lobbySaga from './lobbySaga';
import gameRoomSaga from './gameRoomSaga';
import gameChatSaga from './gameChatSaga';

export default function* rootSaga() {
  yield [
    loginSaga(),
    registerUserSaga(),
    userDataSaga(),
    mainChatSaga(),
    lobbySaga(),
    gameRoomSaga(),
    gameChatSaga(),
  ];
}
