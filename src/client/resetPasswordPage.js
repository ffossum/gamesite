import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from '../routes/resetPasswordRoutes';
import { Provider } from 'react-redux';
import store from './store/resetPasswordStore';

import './client.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);
