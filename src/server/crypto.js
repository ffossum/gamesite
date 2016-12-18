import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 10;

export function hashPassword(password) {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

export function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}
