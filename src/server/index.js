import Koa from 'koa';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import KoaRouter from 'koa-router';
import renderReact from './middleware/renderReact';

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

require('./auth');
app.use(passport.initialize());

router.post('/api/login',
  passport.authenticate('local'),
  ctx => {
    ctx.body = ctx.isAuthenticated();
  }
);

router.get('*', renderReact);

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = 8080;
app.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`${__DEVELOPMENT__ ? 'Development' : 'Production'} environment`);
  console.log(`Listening on port ${PORT}`);
});
