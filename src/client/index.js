import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  browserHistory,
  match,
} from 'react-router';
import {
  syncHistoryWithStore,
} from 'react-router-redux';
import routes from '../routes/';
import {
  Provider,
} from 'react-redux';
import store from './store/';
import socket from './socket/';

import './client.css';

match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
  socket.init(store);

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.get('routing'),
  });

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} {...renderProps} >
        {routes}
      </Router>
    </Provider>,
    document.getElementById('root')
  );

  if (__DEVELOPMENT__) {
    const DevTools = require('../containers/DevTools').default;
    ReactDOM.render(
      <Provider store={store}>
        <DevTools />
      </Provider>,
      document.getElementById('dev-tools')
    );
  }
});
