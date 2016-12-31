import { pick } from 'lodash/fp';

export const getPublicUserData = pick(['id', 'emailHash', 'username']);
export const getOwnUserData = pick(['id', 'email', 'emailHash', 'username']);
