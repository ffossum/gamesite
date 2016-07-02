import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByName } from './db/users';
import { comparePassword } from './crypto';

passport.serializeUser((user, done) => {
  done(null, user.id);
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

passport.use(
  new LocalStrategy({
    session: false,
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    try {
      const user = await authenticate(username, password);
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
