// @flow
import convert from 'koa-convert';
import serve from 'koa-static';
import KoaRouter from 'koa-router';
import {
  renderReact,
  renderResetPasswordPage,
  initializeReduxStore,
} from '../middleware/renderReact';
import {
  refreshJwtCookie,
  authenticateJwtCookie,
  fetchAuthenticatedUserData,
} from '../middleware/jwtCookie';
import api from './api/api';

const router = new KoaRouter();

router.use('/api', api.routes(), api.allowedMethods());

router.get('/reset', renderResetPasswordPage);

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
