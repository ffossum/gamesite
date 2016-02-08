import passport from 'koa-passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {getUserById, getUserByName} from './db';
import bcrypt from 'bcrypt';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  getUserById(userId)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

passport.use(new LocalStrategy(
  {session: false},
  (username, password, done) => {
    authenticate(username, password)
    .then(user => done(null, user))
    .catch(err => done(err));
  }
));

async function authenticate(username, password) {
  const user = await getUserByName(username);
  const match = await comparePassword(password, user.password);
  return match ? user : false;
}

function comparePassword(password, hash) {
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
