// polyfill webpack require.ensure for server side rendering
if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}

import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Root from 'containers/RootContainer';

function getMainPage(location, cb) {
  require.ensure([], require => {
    cb(null, require('containers/MainPageContainer').default);
  });
}

function getPlay(location, cb) {
  require.ensure([], require => {
    cb(null, require('containers/PlayContainer').default);
  });
}

function getAbout(location, cb) {
  require.ensure([], require => {
    cb(null, require('components/About').default);
  });
}

function getCreateGame(location, cb) {
  require.ensure([], require => {
    cb(null, require('containers/CreateGameContainer').default);
  });
}

function getGameRoom(location, cb) {
  require.ensure([], require => {
    cb(null, require('containers/GameRoomContainer').default);
  });
}

export default (
  <Route path="/" component={Root}>
    <IndexRoute getComponent={getMainPage} />
    <Route path="play" getComponent={getPlay}>
      <Route path="create" getComponent={getCreateGame} />
    </Route>
    <Route path="game/:id" getComponent={getGameRoom} />
    <Route path="about" getComponent={getAbout} />
    <Route path="*" getComponent={getAbout} />
  </Route>
);
