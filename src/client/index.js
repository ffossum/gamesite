import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from '../routes';
import configureStore from '../store/configureStore';
import {Provider} from 'react-redux';
import socket from './socket';

const store = configureStore(window.__INITIAL_STATE__);

socket.on('news', data => {
  console.log(data);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
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
