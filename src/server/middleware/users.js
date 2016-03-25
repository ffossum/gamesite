/* eslint no-param-reassign: 0 */

import getPublicUserData from 'util/getPublicUserData';
import { getUsersByIds } from '../db';
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