import shortid from 'shortid';
import { hashPassword } from '../crypto';
import crypto from 'crypto';
import r from 'rethinkdb';
import _ from 'lodash';

export async function getUserById(rdbConn, userId) {
  return r.table('users').get(userId).run(rdbConn);
}

export async function getUsersByIds(rdbConn, userIds) {
  const cursor = await r.table('users').getAll(...userIds).run(rdbConn);
  return cursor.toArray();
}

export async function getUserByName(rdbConn, username) {
  const cursor = await r.table('users').getAll(username, { index: 'username' }).run(rdbConn);
  const result = await cursor.toArray();
  return result[0];
}

export async function addUser(rdbConn, email, username, password) {
  const emailHash = crypto.createHash('md5').update(email).digest('hex');
  const passwordHash = await hashPassword(password);
  const userId = shortid.generate();

  const user = {
    id: userId,
    email,
    emailHash,
    username,
    password: passwordHash,
  };

  await r.table('users').insert(user).run(rdbConn);

  return user;
}

export async function isUsernameAvailable(rdbConn, username) {
  const cursor = await r.table('users')
    .filter(user => user('username').upcase().eq(username.toUpperCase()))
    .run(rdbConn);

  const matches = await cursor.toArray();

  return _.isEmpty(matches);
}

export async function isEmailAvailable(rdbConn, email) {
  const cursor = await r.table('users')
    .filter(user => user('email').upcase().eq(email.toUpperCase()))
    .run(rdbConn);

  const matches = await cursor.toArray();

  return _.isEmpty(matches);
}
