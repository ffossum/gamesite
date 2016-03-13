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
  fetchAuthenticatedUserData
} from './middleware/jwtCookie';
import {validateUsername, validateEmail, registerUser} from './middleware/registerUser';
import http from 'http';
import socket from './socket/';

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

require('./auth');
app.use(passport.initialize());

function sendUserId(ctx) {
  ctx.body = {userId: ctx.req.user.id};
}

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

const server = http.Server(app.callback());
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
