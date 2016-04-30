import bluebird from 'bluebird';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

global.Promise = bluebird;

Promise.promisifyAll(bcrypt);
Promise.promisifyAll(jwt);
