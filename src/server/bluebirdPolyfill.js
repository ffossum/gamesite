// @flow
import bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

global.Promise = bluebird;

bluebird.promisifyAll(jwt);
bluebird.promisifyAll(crypto);
