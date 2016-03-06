import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import KoaRouter from 'koa-router';
import renderReact from './middleware/renderReact';
import {refreshJwtCookie, expireJwtCookie, authenticateJwtCookie} from './middleware/jwtCookie';
import {validateUsername, validateEmail, registerUser} from './middleware/registerUser';
import http from 'http';
import socketIo from 'socket.io';

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
  refreshJwtCookie,
  renderReact);

router.get('/static/*',
  convert(serve('.')));

app
  .use(router.routes())
  .use(router.allowedMethods());

const server = http.Server(app.callback());
const io = socketIo(server);

let handleConnection = require('./socket/handleConnection').default;
io.on('connection', handleConnection);

if (module.hot) {
    module.hot.accept('./socket/handleConnection', () => {
        io.sockets.removeListener('connection', handleConnection);
        handleConnection = require('./socket/handleConnection').default;
        io.on('connection', handleConnection);
    });
}

const PORT = 8080;
server.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info(`${__DEVELOPMENT__ ? 'Development' : 'Production'} environment`);
  console.info(`Listening on port ${PORT}`);
});
