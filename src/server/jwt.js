import jwt from 'jsonwebtoken';
import {getUserById} from './db';

const secret = 'secret'; //TODO read from config

export function signJwt(payload, options) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, token => {
      resolve(token);
    });
  });
}

export function verifyJwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

export async function getUserByJwt(token) {
  const decoded = await verifyJwt(token);
  return await getUserById(decoded.id);
}
