import jwt from 'jsonwebtoken';
import { getUserById } from './db';

const secret = 'secret'; // TODO read from config

export async function signJwt(payload, options) {
  return await jwt.signAsync(payload, secret, options);
}

export async function verifyJwt(token) {
  return await jwt.verifyAsync(token, secret);
}

export async function getUserByJwt(token) {
  const decoded = await verifyJwt(token);
  return await getUserById(decoded.id);
}
