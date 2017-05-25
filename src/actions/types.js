/* @flow */
import type { ModalAction } from './modalActions';
import type { RegisterUserAction } from './registerUserActions';
import type { LoginAction } from './loginActions';
import type { MainChatAction } from './mainChatActions';
import type { GameChatAction } from './gameChatActions';
import type { LobbyAction } from './lobbyActions';
import type { GameRoomAction } from './gameRoomActions';
import type { GameAction } from './gameActions';
import type { UserDataAction } from './userDataActions';
import type { ForgotPasswordAction } from './forgotPasswordActions';

export type Action =
  | LoginAction
  | MainChatAction
  | GameChatAction
  | ModalAction
  | RegisterUserAction
  | LobbyAction
  | GameRoomAction
  | GameAction
  | UserDataAction
  | ForgotPasswordAction
  | { type: '@@INIT' } // Only for use in testing
  ;
