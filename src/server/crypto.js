import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 10;

export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export function comparePassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) {
        reject(err);
      } else {
        resolve(match);
      }
    });
  });
}
