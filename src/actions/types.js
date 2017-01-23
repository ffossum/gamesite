// @flow
import type { ModalAction } from './modal';
import type { RegisterUserAction } from './registerUser';
import type { LoginAction } from './login';
import type { MainChatAction } from './mainChat';
import type { LobbyAction } from './lobbyActions';

export type Action =
  | LoginAction
  | MainChatAction
  | ModalAction
  | RegisterUserAction
  | LobbyAction
  | { type: '@@INIT' } // Only for use in testing
  ;
