import Koa from 'koa';
import path from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import routes from '../routes';
import reducer from '../reducers';

let template = require('./views/index.hbs');
if (module.hot) {
  module.hot.accept('./views/index.hbs', () => {
    template = require('./views/index.hbs');
  });
}

const app = new Koa();

app.use(ctx => {
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
});

const PORT = 8080;
app.listen(PORT, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`${__DEVELOPMENT__ ? 'Development' : 'Production'} environment`);
  console.log(`Listening on port ${PORT}`);
});
