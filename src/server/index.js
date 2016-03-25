/* eslint no-console: 0 */

import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import KoaRouter from 'koa-router';
import renderReact from './middleware/renderReact';
import {
  refreshJwtCookie,
  expireJwtCookie,
  authenticateJwtCookie,
  requireAuthentication,
  fetchAuthenticatedUserData,
} from './middleware/jwtCookie';
import {
  validateUsername,
  validateEmail,
  registerUser,
  sendUserId,
} from './middleware/registerUser';
import {
  getUsers,
} from './middleware/users';
import { createGame } from './middleware/games';
import http from 'http';
import socket from './socket/';

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

require('./auth');
app.use(passport.initialize());

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
  sendUserId);

router.post('/api/games',
  authenticateJwtCookie,
  requireAuthentication,
  createGame);

router.get('/api/users', getUsers);

router.get('*',
  authenticateJwtCookie,
  fetchAuthenticatedUserData,
  refreshJwtCookie,
  renderReact);

router.get('/static/*',
  convert(serve('.')));

app
  .use(router.routes())
  .use(router.allowedMethods());

const server = new http.Server(app.callback());
socket.init(server);

const PORT = 8080;
server.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info(`${__DEVELOPMENT__ ? 'Development' : 'Production'} environment`);
  console.info(`Listening on port ${PORT}`);
});
