import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import KoaRouter from 'koa-router';
import renderReact from './middleware/renderReact';
import {refreshJwtCookie, expireJwtCookie, authenticateJwtCookie} from './middleware/jwtCookie';

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

require('./auth');
app.use(passport.initialize());

router.post('/api/login',
  passport.authenticate('local'),
  refreshJwtCookie,
  ctx => {
    ctx.body = {userId: ctx.req.user.id};
  }
);

router.post('/api/logout', expireJwtCookie);

router.get('*',
  authenticateJwtCookie,
  refreshJwtCookie,
  renderReact);

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = 8080;
app.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.info(`${__DEVELOPMENT__ ? 'Development' : 'Production'} environment`);
  console.info(`Listening on port ${PORT}`);
});
