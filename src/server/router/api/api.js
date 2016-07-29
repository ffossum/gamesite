import passport from 'koa-passport';
import KoaRouter from 'koa-router';
import {
  refreshJwtCookie,
  expireJwtCookie,
} from '../../middleware/jwtCookie';
import {
  validateUsername,
  validateEmail,
  registerUser,
  sendUserId,
} from '../../middleware/registerUser';
import {
  getUsers,
} from '../../middleware/users';

const api = new KoaRouter();

api.post('/login',
  passport.authenticate('local'),
  refreshJwtCookie,
  sendUserId
);

api.post('/logout', expireJwtCookie);

api.post('/register',
  validateUsername,
  validateEmail,
  registerUser,
  refreshJwtCookie,
  sendUserId,
);

api.get('/users',
  getUsers,
);

export default api;
