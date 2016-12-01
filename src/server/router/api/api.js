/* eslint no-param-reassign: 0 */

import passport from 'koa-passport';
import KoaRouter from 'koa-router';
import {
  refreshJwtCookie,
  expireJwtCookie,
  fetchAuthenticatedUserData,
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
import { getOwnUserData } from 'util/userDataUtils';
import { getUserGames } from 'server/db/games';

const api = new KoaRouter();

api.post('/login',
  passport.authenticate('local'),
  refreshJwtCookie,
  fetchAuthenticatedUserData,
  async ctx => {
    const userGames = await getUserGames(ctx.req.user.id);
    ctx.body = {
      user: getOwnUserData(ctx.req.user),
      games: userGames,
    };
  },
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
