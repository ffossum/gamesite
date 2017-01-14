import bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

global.Promise = bluebird;

Promise.promisifyAll(jwt);
Promise.promisifyAll(crypto);
