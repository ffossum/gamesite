import _ from 'lodash';
import shortid from 'shortid';
import { hashPassword } from './crypto';
import crypto from 'crypto';

export class User {}

const qwer = new User();
qwer.id = '1';
qwer.email = 'qwer@qwer.com';
qwer.emailHash = 'be21ac26fd0e7285f81f9bc8b3bf5b28';
qwer.username = 'qwer';
qwer.password = '$2a$10$gwEaMm8Oxz7PiuRFeItAe.aJ9vnYfsiD9.La0/Ps4g3RXc0a4L6oe';
qwer.games = new Set();

const asdf = new User();
asdf.id = '2';
asdf.email = 'asdf@asdf.com';
asdf.emailHash = '87f60ea777b0d9395d5d4ad7ea4be745';
asdf.username = 'asdf';
asdf.password = '$2a$10$hlW/XFsfuoU4Vsroy6.ECuqMqvpXtlIXFGzKIjVm.3TfLfmZ4wGmO';
asdf.games = new Set();

const zxcv = new User();
zxcv.id = '3';
zxcv.email = 'zxcv@zxcv.com';
zxcv.emailHash = '46e3bfea63ce5e692e532d1b374b9e79';
zxcv.username = 'zxcv';
zxcv.password = '$2a$10$lBWHGGB0x3NdUM5gqeqIBe8clEs8X/BtvXNCuaTOyYJnqLm6lXWfO';
zxcv.games = new Set();

const db = {
  [qwer.id]: qwer,
  [asdf.id]: asdf,
  [zxcv.id]: zxcv,
};

export async function getUserById(userId) {
  return db[userId];
}

export async function getUsersByIds(userIds) {
  return _.chain(userIds)
    .map(id => db[id])
    .omitBy(_.isNull)
    .omitBy(_.isUndefined)
    .value();
}

export async function getUserByName(username) {
  return _.find(db, { username });
}

export async function addUser(email, username, password) {
  const emailHash = crypto.createHash('md5').update(email).digest('hex');
  const passwordHash = await hashPassword(password);

  const user = new User();

  user.id = shortid.generate();
  user.email = email;
  user.emailHash = emailHash;
  user.username = username;
  user.password = passwordHash;
  user.games = new Set();

  db[user.id] = user;
  return user;
}

export async function isUsernameAvailable(username) {
  return !_.some(db, user => user.username === username);
}

export async function isEmailAvailable(email) {
  return !_.some(db, user => user.email === email);
}

export async function addGameToUser(userId, gameId) {
  return db[userId].games.add(gameId);
}

export async function removeGameFromUser(userId, gameId) {
  return db[userId].games.delete(gameId);
}
