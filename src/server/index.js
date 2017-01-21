// @flow
/* eslint no-console: 0 */
import path from 'path';
import Koa from 'koa';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import favicon from 'koa-favicon';
import router from './router/router';
import initDb from './db/init';
import deepstream from './socket/deepstream';

initDb();

const app = new Koa();

app.use(compress());
app.use(bodyParser());

app.use(favicon(path.join('.', 'static', 'favicon.ico')));

require('./auth');
app.use(passport.initialize());

app.use(router.routes(), router.allowedMethods());

deepstream.init();

const PORT = 8080;
app.listen({ port: PORT, path: '0.0.0.0' }, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info(`${__DEVELOPMENT__ ? 'Development' : 'Production'} environment`);
  console.info(`Listening on port ${PORT}`);
});
