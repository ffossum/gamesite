import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/Main';
import configureStore from '../store/configureStore';
import {Provider} from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById('root'));

const DevTools = require('../containers/DevTools').default;
ReactDOM.render(
  <Provider store={store}>
    <DevTools />
  </Provider>,
  document.getElementById('dev-tools'));
