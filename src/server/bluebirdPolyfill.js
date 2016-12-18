import bluebird from 'bluebird';
import jwt from 'jsonwebtoken';

global.Promise = bluebird;

Promise.promisifyAll(jwt);
