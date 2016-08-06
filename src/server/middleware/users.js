/* eslint no-param-reassign: 0 */

import { getPublicUserData } from 'util/userDataUtils';
import { getUsersByIds } from '../db/users';
import _ from 'lodash';

export async function getUsers(ctx) {
  const userIds = ctx.query.id && ctx.query.id.split(',');
  let users = await getUsersByIds(userIds);
  users = _.chain(users)
    .map(getPublicUserData)
    .keyBy('id')
    .value();

  ctx.body = { users };

  ctx.status = 200;
}
