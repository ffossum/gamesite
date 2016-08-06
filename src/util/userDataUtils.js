import _ from 'lodash';

export function getPublicUserData(user) {
  return _.pick(user, ['id', 'emailHash', 'username']);
}

export function getOwnUserData(user) {
  return _.pick(user, ['id', 'email', 'emailHash', 'username']);
}
