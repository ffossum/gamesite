import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/';
import socketMiddleware from './middleware/socketMiddleware';
import historyMiddleware from './middleware/historyMiddleware';

const finalCreateStore = compose(
  applyMiddleware(
    thunk,
    socketMiddleware,
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
