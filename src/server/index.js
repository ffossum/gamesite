import Koa from 'koa';
import path from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import routes from '../routes';
import reducer from '../reducers';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import KoaRouter from 'koa-router';

let template = require('./views/index.hbs');
if (module.hot) {
  module.hot.accept('./views/index.hbs', () => {
    template = require('./views/index.hbs');
  });
}

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

require('./auth');
app.use(passport.initialize());

router.post('/api/auth',
  passport.authenticate('local'),
  ctx => {
    ctx.body = ctx.isAuthenticated();
  }
);

router.get('*',
  ctx => {
    match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
      if (renderProps) {
        const store = createStore(reducer);
        const initialState = store.getState();

        const reactString = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        ctx.body = template({
          reactString,
          initialState: JSON.stringify(initialState)
        });
      }
    });
  }
);

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
