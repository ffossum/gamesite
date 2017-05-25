/* @flow */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { logInSuccess } from 'actions/loginActions';
import { getUserDataSuccess } from 'actions/userDataActions';
import { resetMessages } from 'actions/mainChatActions';
import { resetCounter } from 'util/uniqueId';
import { refreshLobbySuccess, gamesUpdated } from 'actions/lobbyActions';
import { getPublicUserData, getOwnUserData } from '../../util/userDataUtils';
import { getMessageCacheInstance } from '../socket/messageCache';
import { getUsersByIds } from '../db/users';
import { getLobbyGames, getUserGames } from '../db/games';
import { flatten, flow, isEmpty, keyBy, map, uniq } from 'lodash/fp';
import resetPasswordReducer from '../../reducers/resetPasswordReducer';
import ResetPasswordRoutes from '../../routes/resetPasswordRoutes';
import resetPasswordTemplate from '../views/resetPasswordTemplate';

import type { Context } from 'koa';
type PassportContext = Context & {
  isAuthenticated: () => boolean,
  req: {
    user: Object
  }
}

const messageCache = getMessageCacheInstance();

let reducer = require('../../reducers').default;
let AppRoutes = require('../../routes').default;
let template = require('../views/template').default;

if (module.hot) {
  module.hot.accept('../../reducers', () => {
    reducer = require('../../reducers').default;
  });
  module.hot.accept('../../routes', () => {
    AppRoutes = require('../../routes').default;
  });
  module.hot.accept('../views/template', () => {
    template = require('../views/template').default;
  });
}

export async function initializeReduxStore(ctx: PassportContext, next: () => Promise<void>) {
  const store = createStore(reducer);

  let getUserGamesPromise = Promise.resolve({});
  if (ctx.isAuthenticated()) {
    store.dispatch(logInSuccess(getOwnUserData(ctx.req.user)));
    getUserGamesPromise = getUserGames(ctx.req.user.id);
  }

  const [{ games }, userGames] = await Promise.all([
    getLobbyGames(),
    getUserGamesPromise,
  ]);

  store.dispatch(refreshLobbySuccess({ games }));
  store.dispatch(gamesUpdated(userGames));

  const gamesUserIds = flow(
    map(game => game.users),
    flatten,
  )({ ...games, ...userGames });

  const userIds = uniq([...messageCache.getUserIds(), ...gamesUserIds]);
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

export async function renderReact(ctx: Context, next: () => Promise<void>) {
  const { store } = ctx.state;

  const routerContext = {};

  resetCounter();
  const reactString = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.url} context={routerContext}>
        <AppRoutes />
      </StaticRouter>
    </Provider>
  );

  ctx.body = template({
    reactString,
    initialState: JSON.stringify(store.getState()),
  });

  await next();
}

export async function renderResetPasswordPage(ctx: Context) {
  const store = createStore(resetPasswordReducer);
  const routerContext = {};

  resetCounter();
  const reactString = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.url} context={routerContext}>
        <ResetPasswordRoutes />
      </StaticRouter>
    </Provider>
  );

  ctx.body = resetPasswordTemplate({ reactString });
}
