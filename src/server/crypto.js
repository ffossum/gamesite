//@flow
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const BCRYPT_SALT_ROUNDS = 10;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export const randomBytes = crypto.randomBytesAsync;
