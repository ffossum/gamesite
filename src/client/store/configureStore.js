import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/';
import historyMiddleware from './middleware/historyMiddleware';
import deepstreamMiddleware from './middleware/deepstreamMiddleware';

const finalCreateStore = compose(
  applyMiddleware(
    thunk,
    deepstreamMiddleware,
    historyMiddleware,
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('reducers/', () => {
      store.replaceReducer(require('reducers/').default);
    });
  }

  return store;
}
