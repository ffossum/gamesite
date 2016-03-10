import bluebird from 'bluebird';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

global.Promise = bluebird;

export function promisifyValueFirst(fn) {
  return function(...args) {
    return new Promise(resolve => {
      args.push(resolve);
      fn.apply(this, args);
    });
  };
}

Promise.promisifyAll(bcrypt);
Promise.promisifyAll(jwt);
jwt.signAsync = promisifyValueFirst(jwt.sign);
