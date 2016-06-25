/* eslint no-console: 0 */


import path from 'path';
import Koa from 'koa';
import compress from 'koa-compress';
import convert from 'koa-convert';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import KoaRouter from 'koa-router';
import favicon from 'koa-favicon';
import {
  connectRdb,
} from './middleware/connectRdb';
import {
  renderReact,
  initializeReduxStore,
} from './middleware/renderReact';
import {
  refreshJwtCookie,
  expireJwtCookie,
  authenticateJwtCookie,
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
import http from 'http';
import socket from './socket/';
import initDb from './db/init';

initDb();

const app = new Koa();
const router = new KoaRouter();

app.use(compress());
app.use(bodyParser());

app.use(favicon(path.join('.', 'static', 'favicon.ico')));

require('./auth');
app.use(passport.initialize());

router.post('/api/login',
  connectRdb,
  passport.authenticate('local'),
  refreshJwtCookie,
  sendUserId
);

router.post('/api/logout', expireJwtCookie);

router.post('/api/register',
  connectRdb,
  validateUsername,
  validateEmail,
  registerUser,
  refreshJwtCookie,
  sendUserId,
);

router.get('/api/users',
  connectRdb,
  getUsers,
);

router.get('/static/*',
  convert(serve('.')),
);

router.get('/*',
  connectRdb,
  authenticateJwtCookie,
  fetchAuthenticatedUserData,
  refreshJwtCookie,
  initializeReduxStore,
  renderReact,
);

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
