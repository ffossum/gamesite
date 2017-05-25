import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Routes from '../routes/';
import {
  Provider,
} from 'react-redux';
import store from './store/';
import socket from './socket/';

import './client.css';

socket.init(store);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
