/* eslint no-param-reassign: 0 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { logInSuccess } from 'actions/login';
import { addUserData } from 'actions/userData';
import { resetMessages } from 'actions/mainChat';
import { resetCounter } from 'util/uniqueId';
import { lobbyRefreshed } from 'actions/gamesList';
import getPublicUserData from '../../util/getPublicUserData';
import { getMessageCacheInstance } from '../socket/messageCache';
import { getUsersByIds } from '../db/users';
import { getNotStarted } from '../db/games';
import _ from 'lodash';
import { toJSON, fromJSON } from 'transit-immutable-js';

const messageCache = getMessageCacheInstance();

let reducer = require('../../reducers').default;
let appRoutes = require('../../routes').default;
let template = require('../views/template').default;

if (module.hot) {
  module.hot.accept('../../reducers', () => {
    reducer = require('../../reducers').default;
  });
  module.hot.accept('../../routes', () => {
    appRoutes = require('../../routes').default;
  });
  module.hot.accept('../views/template', () => {
    template = require('../views/template').default;
  });
}

function matchRoutes(routes, location) {
  return new Promise((resolve, reject) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
      } else {
        resolve({ redirectLocation, renderProps });
      }
    });
  });
}

export async function initializeReduxStore(ctx, next) {
  const store = createStore(reducer);
  if (ctx.isAuthenticated()) {
    store.dispatch(logInSuccess(getPublicUserData(ctx.req.user)));
  }

  const games = await getNotStarted();
  store.dispatch(lobbyRefreshed(games));

  const gamesUserIds = _.chain(games)
      .map(game => game.users)
      .flatten()
      .value();

  const userIds = _.uniq([...messageCache.userIds, ...gamesUserIds]);
  if (!_.isEmpty(userIds)) {
    const users = await getUsersByIds(userIds);
    const publicUserData = _.chain(users)
      .map(getPublicUserData)
      .keyBy('id')
      .value();

    store.dispatch(addUserData(publicUserData));
  }
  store.dispatch(resetMessages(messageCache.messages));

  ctx.state.store = store;
  await next();
}

export async function renderReact(ctx, next) {
  const { renderProps } = await matchRoutes(appRoutes, ctx.url);
  if (renderProps) {
    const { store } = ctx.state;

    resetCounter();
    const reactString = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    ctx.body = template({
      __DEVELOPMENT__,
      reactString,
      initialState: JSON.stringify(toJSON(store.getState())),
    });
  }
  await next();
}
