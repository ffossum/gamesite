import shortid from 'shortid';
import { hashPassword } from '../crypto';
import crypto from 'crypto';
import db from './index';

export async function getUserById(userId) {
  return db.oneOrNone(`
    SELECT id, username, email, email_hash AS "emailHash", password
    FROM users
    WHERE id=$1`, userId);
}

export async function getUsersByIds(userIds) {
  return db.many(`
    SELECT id, username, email, email_hash AS "emailHash", password
    FROM users
    WHERE id=ANY($(userIds))`, { userIds });
}

export async function getUserByName(username) {
  return db.oneOrNone(`
    SELECT id, username, email, email_hash AS "emailHash", password
    FROM users
    WHERE username=$1`, username);
}

export async function addUser(email, username, password) {
  const emailHash = crypto.createHash('md5').update(email).digest('hex');
  const passwordHash = await hashPassword(password);

  const user = {
    id: shortid.generate(),
    email,
    emailHash,
    username,
    password: passwordHash,
  };

  db.none(`INSERT INTO users (id, email, email_hash, username, password)
    VALUES ($(id), $(email), $(emailHash), $(username), $(password))`, user);

  return user;
}

export async function isUsernameAvailable(username) {
  const { exists } = await db.one('SELECT EXISTS(SELECT 1 FROM users WHERE username=$1)', username);
  return !exists;
}

export async function isEmailAvailable(email) {
  const { exists } = await db.one('SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)', email);
  return !exists;
}
