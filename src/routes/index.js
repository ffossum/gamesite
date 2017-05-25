// polyfill webpack require.ensure for server side rendering
if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}

import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Root from 'containers/RootContainer';

import MainPage from 'containers/MainPageContainer';
import Play from 'containers/PlayContainer';
import About from 'components/About';
import CreateGame from 'containers/CreateGameContainer';
import GameRoom from 'containers/GameRoomContainer';

export default function Routes() {
  return (
    <Root>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/play" render={() => (
          <Play>
            <Route exact path="/play/create" component={CreateGame} />
          </Play>
        )} />
        <Route path="/game/:id" component={GameRoom} />
        <Route path="/about" component={About} />

        <Route component={About} />
      </Switch>
    </Root>
  );
}
