import _ from 'lodash';

export default function getPublicUserData(user) {
  return _.pick(user, ['id', 'emailHash', 'username']);
}
