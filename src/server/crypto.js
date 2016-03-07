import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 10;

export async function hashPassword(password) {
  return await bcrypt.hashAsync(password, BCRYPT_SALT_ROUNDS);
}

export async function comparePassword(password, hash) {
  return await bcrypt.compareAsync(password, hash);
}
