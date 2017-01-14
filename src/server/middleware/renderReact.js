/* eslint no-param-reassign: 0 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { logInSuccess } from 'actions/login';
import { getUserDataSuccess } from 'actions/userData';
import { resetMessages } from 'actions/mainChat';
import { resetCounter } from 'util/uniqueId';
import { refreshLobbySuccess, gamesUpdated } from 'actions/lobbyActions';
import { getPublicUserData, getOwnUserData } from '../../util/userDataUtils';
import { getMessageCacheInstance } from '../socket/messageCache';
import { getUsersByIds } from '../db/users';
import { getLobbyGames, getUserGames } from '../db/games';
import { flatten, flow, isEmpty, keyBy, map, uniq } from 'lodash/fp';
import resetPasswordReducer from '../../reducers/resetPasswordReducer';
import resetPasswordRoutes from '../../routes/resetPasswordRoutes';
import resetPasswordTemplate from '../views/resetPasswordTemplate';

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

  let getUserGamesPromise = Promise.resolve({});
  if (ctx.isAuthenticated()) {
    store.dispatch(logInSuccess(getOwnUserData(ctx.req.user)));
    getUserGamesPromise = getUserGames(ctx.req.user.id);
  }

  const [{ games, refreshed }, userGames] = await Promise.all([
    getLobbyGames(),
    getUserGamesPromise,
  ]);

  store.dispatch(refreshLobbySuccess({ games, refreshed }));
  store.dispatch(gamesUpdated(userGames));

  const gamesUserIds = flow(
    map(game => game.users),
    flatten,
  )({ ...games, ...userGames });

  const userIds = uniq([...messageCache.userIds, ...gamesUserIds]);
  if (!isEmpty(userIds)) {
    const users = await getUsersByIds(userIds);
    const publicUserData = flow(
      map(getPublicUserData),
      keyBy('id'),
    )(users);

    store.dispatch(getUserDataSuccess(publicUserData));
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
      reactString,
      initialState: JSON.stringify(store.getState()),
    });
  }
  await next();
}

export async function renderResetPasswordPage(ctx) {
  const { renderProps } = await matchRoutes(resetPasswordRoutes, ctx.url);
  if (renderProps) {
    const store = createStore(resetPasswordReducer);
    resetCounter();
    const reactString = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    ctx.body = resetPasswordTemplate({ reactString });
  }
}
