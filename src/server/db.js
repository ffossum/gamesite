import _ from 'lodash';
import shortid from 'shortid';
import {hashPassword} from './crypto';

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

export async function addUser(username, password) {
  const hashedPassword = await hashPassword(password);

  const user = new User();

  user.id = shortid.generate();
  user.username = username;
  user.password = hashedPassword;

  db[user.id] = user;
  console.log(db);
  return user;
}

export class User {}

const qwer = new User();
qwer.id = "1";
qwer.username = "qwer";
qwer.password = "$2a$10$gwEaMm8Oxz7PiuRFeItAe.aJ9vnYfsiD9.La0/Ps4g3RXc0a4L6oe";

const asdf = new User();
asdf.id = "2";
asdf.username = "asdf";
asdf.password = "$2a$10$hlW/XFsfuoU4Vsroy6.ECuqMqvpXtlIXFGzKIjVm.3TfLfmZ4wGmO";

const zxcv = new User();
zxcv.id = "3";
zxcv.username = "zxcv";
zxcv.password = "$2a$10$lBWHGGB0x3NdUM5gqeqIBe8clEs8X/BtvXNCuaTOyYJnqLm6lXWfO";

const db = {
  [qwer.id]: qwer,
  [asdf.id]: asdf,
  [zxcv.id]: zxcv
};
