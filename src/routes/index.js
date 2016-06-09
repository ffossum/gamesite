import React from 'react';
import { IndexRoute, Route } from 'react-router';
import MainPage from 'containers/MainPageContainer';
import Play from 'containers/PlayContainer';
import About from 'components/About';
import CreateGame from 'containers/CreateGameContainer';
import GameRoom from 'containers/GameRoomContainer';
import Root from 'containers/RootContainer';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={MainPage} />
    <Route path="play" component={Play}>
      <Route path="create" component={CreateGame} />
    </Route>
    <Route path="game/:id" component={GameRoom} />
    <Route path="about" component={About} />
  </Route>
);
