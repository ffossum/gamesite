// @flow
import jwt from 'jsonwebtoken';
import { getUserById } from './db/users';

const secret = 'secret'; // TODO read from config

export async function signJwt(
  payload: Object | Buffer | string,
  options?: Object) {
  return await jwt.signAsync(payload, secret, options);
}

export async function verifyJwt(token: string): { [key: string]: string } {
  return await jwt.verifyAsync(token, secret);
}

export async function getUserByJwt(token: string) {
  const decoded = await verifyJwt(token);
  const user = await getUserById(decoded.id);
  return user;
}
