import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers/';
import historyMiddleware from './middleware/historyMiddleware';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

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
    historyMiddleware,
  ),
  devToolsExtension,
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('reducers/', () => {
      store.replaceReducer(require('reducers/').default);
    });
  }

  return store;
}
