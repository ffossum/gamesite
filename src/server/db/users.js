import shortid from 'shortid';
import { hashPassword } from '../crypto';
import crypto from 'crypto';
import r from './rethinkdb';
import { isEmpty } from 'lodash/fp';

export async function getUserById(userId) {
  return r.table('users').get(userId).run();
}

export async function getUsersByIds(userIds) {
  return r.table('users').getAll(...userIds).run();
}

export async function getUserByName(username) {
  const users = await r.table('users').getAll(username, { index: 'username' }).run();
  return users[0];
}

export async function addUser(email, username, password) {
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

  await r.table('users').insert(user).run();

  return user;
}

export async function isUsernameAvailable(username) {
  const matches = await r.table('users')
    .filter(user => user('username').upcase().eq(username.toUpperCase()))
    .run();

  return isEmpty(matches);
}

export async function isEmailAvailable(email) {
  const matches = await r.table('users')
    .filter(user => user('email').upcase().eq(email.toUpperCase()))
    .run();

  return isEmpty(matches);
}

export async function saveForgotPasswordToken(email, token) {
  const result = await r.table('users')
    .getAll(email, { index: 'email' })
    .update({
      forgotPasswordToken: token,
      forgotPasswordDate: r.now(),
    }, { returnChanges: true })
    .run();

  return result.replaced === 1 &&
    result.errors === 0 &&
    result.changes[0].new_val;
}

export async function isValidResetPasswordToken(userId, token) {
  try {
    return r.table('users').get(userId)
      .do(
        r.and(
          r.row.hasFields('forgotPasswordToken', 'forgotPasswordDate'),
          r.row('forgotPasswordToken').eq(token),
          r.row('forgotPasswordDate').gt(r.now().sub(60 * 60)) // 60 * 60 seconds = 1 hour
        )
      )
      .run();
  } catch (err) {
    return false;
  }
}

export async function changePassword(userId, password) {
  const passwordHash = await hashPassword(password);
  const result = await r.table('users').get(userId)
    .replace(
      r.row.without('forgotPasswordToken', 'forgotPasswordDate')
        .merge({ password: passwordHash })
    )
    .run();

  return result.replaced === 1 && result.errors === 0;
}
