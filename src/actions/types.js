// @flow
import type { ModalAction } from './modal';
import type { RegisterUserAction } from './registerUser';
import type { LoginAction } from './login';

export type Action =
  | LoginAction
  | ModalAction
  | RegisterUserAction
  | { type: '@@INIT' } // Only for use in testing
  ;
