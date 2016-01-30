import passport from 'koa-passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {getUserById, getUserByName} from './db';

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
    getUserByName(username)
    .then(user => {
      if (user.password === password) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      done(err);
    });
  }
));
