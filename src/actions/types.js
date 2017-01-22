// @flow
import type { ModalAction } from './modal';
import type { RegisterUserAction } from './registerUser';
import type { LoginAction } from './login';
import type { MainChatAction } from './mainChat';

export type Action =
  | LoginAction
  | MainChatAction
  | ModalAction
  | RegisterUserAction
  | { type: '@@INIT' } // Only for use in testing
  ;
