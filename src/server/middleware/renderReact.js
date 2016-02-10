import React from 'react';
import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import {logInSuccess} from 'actions/login';
import {resetCounter} from 'util/uniqueId';

let reducer = require('../../reducers').default;
let routes = require('../../routes').default;
let template = require('../views/index.hbs');

if (module.hot) {
  module.hot.accept('../../reducers', () => {
    reducer = require('../../reducers').default;
  });
  module.hot.accept('../../routes', () => {
    routes = require('../../routes').default;
  });
  module.hot.accept('../views/index.hbs', () => {
    template = require('../views/index.hbs');
  });
}

function matchRoutes(routes, location) {
  return new Promise((resolve, reject) => {
    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
      } else {
        resolve({redirectLocation, renderProps});
      }
    });
  });
}

export default async function renderReact(ctx, next) {
  const {renderProps} = await matchRoutes(routes, ctx.url);
  if (renderProps) {
    const store = createStore(reducer);
    if (ctx.isAuthenticated()) {
      store.dispatch(logInSuccess(ctx.req.user.id));
    }
    const initialState = store.getState();

    resetCounter();
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
  await next();
}
