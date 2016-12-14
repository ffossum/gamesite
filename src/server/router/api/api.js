/* eslint no-param-reassign: 0 */

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
  ctx => {
    ctx.status = 200;
  }
);

api.post('/logout',
  expireJwtCookie,
  ctx => {
    ctx.status = 200;
  }
);

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
