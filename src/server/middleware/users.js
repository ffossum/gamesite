/* eslint no-param-reassign: 0 */

import { getPublicUserData } from 'util/userDataUtils';
import { getUsersByIds } from '../db/users';
import { flow, keyBy, map } from 'lodash/fp';

export async function getUsers(ctx) {
  const userIds = ctx.query.id && ctx.query.id.split(',');
  let users = await getUsersByIds(userIds);
  users = flow(
    map(getPublicUserData),
    keyBy('id'),
  )(users);

  ctx.body = { users };

  ctx.status = 200;
}
