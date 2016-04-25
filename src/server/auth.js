import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserById, getUserByName } from './db/users';
import { comparePassword } from './crypto';

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

async function authenticate(username, password) {
  try {
    const user = await getUserByName(username);
    const match = await comparePassword(password, user.password);
    return match ? user : false;
  } catch (err) {
    return false;
  }
}

passport.use(new LocalStrategy(
  { session: false },
  (username, password, done) => {
    authenticate(username, password)
    .then(user => done(null, user))
    .catch(err => done(err));
  }
));
