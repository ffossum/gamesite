import passport from 'koa-passport';
import {Strategy as LocalStrategy} from 'passport-local';

const user = {id: '1', username: 'test'};

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  if (id === '1') {
    done(null, user);
  } else {
    done('User not found');
  }
});

passport.use(new LocalStrategy((username, password, done) => {
  console.log('local strategy!');
  if (username === 'test' && password === 'test') {
    console.log('found user!');
    done(null, user);
  } else {
    done(null, false);
  }
}));
