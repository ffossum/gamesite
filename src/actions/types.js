// @flow
import type { ModalAction } from './modal';
import type { RegisterUserAction } from './registerUser';
import type { LoginAction } from './login';
import type { MainChatAction } from './mainChat';
import type { GameChatAction } from './gameChat';
import type { LobbyAction } from './lobbyActions';
import type { GameRoomAction } from './gameRoom';
import type { GameAction } from './game';

export type Action =
  | LoginAction
  | MainChatAction
  | GameChatAction
  | ModalAction
  | RegisterUserAction
  | LobbyAction
  | GameRoomAction
  | GameAction
  | { type: '@@INIT' } // Only for use in testing
  ;
