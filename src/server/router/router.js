import convert from 'koa-convert';
import serve from 'koa-static';
import KoaRouter from 'koa-router';
import passport from 'koa-passport';
import {
  renderReact,
  initializeReduxStore,
} from '../middleware/renderReact';
import {
  refreshJwtCookie,
  expireJwtCookie,
  authenticateJwtCookie,
  fetchAuthenticatedUserData,
} from '../middleware/jwtCookie';
import {
  validateUsername,
  validateEmail,
  registerUser,
  sendUserId,
} from '../middleware/registerUser';
import {
  getUsers,
} from '../middleware/users';

const router = new KoaRouter();

router.post('/api/login',
  passport.authenticate('local'),
  refreshJwtCookie,
  sendUserId
);

router.post('/api/logout', expireJwtCookie);

router.post('/api/register',
  validateUsername,
  validateEmail,
  registerUser,
  refreshJwtCookie,
  sendUserId,
);

router.get('/api/users',
  getUsers,
);

router.get('/static/*',
  convert(serve('.')),
);

router.get('/*',
  authenticateJwtCookie,
  fetchAuthenticatedUserData,
  refreshJwtCookie,
  initializeReduxStore,
  renderReact,
);

export default router;
