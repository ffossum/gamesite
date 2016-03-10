import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from '../routes/';
import {Provider} from 'react-redux';
import store from './store';
import socket from './socket/';

import './client.css';

socket.init(store);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root'));

if (__DEVELOPMENT__) {
  const DevTools = require('../containers/DevTools').default;
  ReactDOM.render(
    <Provider store={store}>
      <DevTools />
    </Provider>,
    document.getElementById('dev-tools'));
}
