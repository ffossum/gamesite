import _ from 'lodash';
import shortid from 'shortid';
import {hashPassword} from './crypto';
import crypto from 'crypto';

export function getUserById(userId) {
  return new Promise((resolve, reject) => {
    resolve(db[userId]);
  });
}

export function getUserByName(username) {
  return new Promise((resolve, reject) => {
    resolve(_.find(db, {username}));
  });
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

  db[user.id] = user;
  return user;
}

export function isUsernameAvailable(username) {
  return new Promise((resolve, reject) => {
    resolve(!_.some(db, user => user.username === username));
  });
}

export function isEmailAvailable(email) {
  return new Promise((resolve, reject) => {
    resolve(!_.some(db, user => user.email === email));
  });
}

export class User {}

const qwer = new User();
qwer.id = "1";
qwer.email = "qwer@qwer.com";
qwer.emailHash = "be21ac26fd0e7285f81f9bc8b3bf5b28";
qwer.username = "qwer";
qwer.password = "$2a$10$gwEaMm8Oxz7PiuRFeItAe.aJ9vnYfsiD9.La0/Ps4g3RXc0a4L6oe";

const asdf = new User();
asdf.id = "2";
asdf.email = "asdf@asdf.com";
asdf.emailHash = "87f60ea777b0d9395d5d4ad7ea4be745";
asdf.username = "asdf";
asdf.password = "$2a$10$hlW/XFsfuoU4Vsroy6.ECuqMqvpXtlIXFGzKIjVm.3TfLfmZ4wGmO";

const zxcv = new User();
zxcv.id = "3";
zxcv.email = "zxcv@zxcv.com"
zxcv.emailHash = "46e3bfea63ce5e692e532d1b374b9e79";
zxcv.username = "zxcv";
zxcv.password = "$2a$10$lBWHGGB0x3NdUM5gqeqIBe8clEs8X/BtvXNCuaTOyYJnqLm6lXWfO";

const db = {
  [qwer.id]: qwer,
  [asdf.id]: asdf,
  [zxcv.id]: zxcv
};
