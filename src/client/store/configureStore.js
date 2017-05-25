// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers/';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

import type { State } from 'reducers';
import type { Store } from './index';

const sagaMiddleware = createSagaMiddleware();

let devToolsExtension = f => f;
if (__DEVELOPMENT__) {
  if (window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension();
  }
}

const finalCreateStore = compose(
  applyMiddleware(
    sagaMiddleware,
  ),
  devToolsExtension,
)(createStore);

export default function configureStore(initialState: State): Store {
  const store = finalCreateStore(rootReducer, initialState);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('reducers/', () => {
      store.replaceReducer(require('reducers/').default);
    });
  }

  return store;
}
