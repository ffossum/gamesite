import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  browserHistory,
} from 'react-router';
import routes from '../routes/resetPasswordRoutes';
import { Provider } from 'react-redux';
import store from './store/resetPasswordStore';

import './client.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
