/* @flow */
export type ErrorType =
  | 'error/USERNAME_TAKEN'
  | 'error/PASSWORDS_DO_NOT_MATCH'
  | 'error/INVALID_EMAIL'
  | 'error/EMAIL_TAKEN'
  | 'error/RESET_TOKEN_INVALID'
  | 'error/UNKNOWN'
  ;

const USERNAME_TAKEN: ErrorType = 'error/USERNAME_TAKEN';
const PASSWORDS_DO_NOT_MATCH: ErrorType = 'error/PASSWORDS_DO_NOT_MATCH';
const INVALID_EMAIL: ErrorType = 'error/INVALID_EMAIL';
const EMAIL_TAKEN: ErrorType = 'error/EMAIL_TAKEN';
const RESET_TOKEN_INVALID: ErrorType = 'error/RESET_TOKEN_INVALID';
const UNKNOWN_ERROR: ErrorType = 'error/UNKNOWN';

export default {
  USERNAME_TAKEN,
  PASSWORDS_DO_NOT_MATCH,
  INVALID_EMAIL,
  EMAIL_TAKEN,
  RESET_TOKEN_INVALID,
  UNKNOWN_ERROR,
};
