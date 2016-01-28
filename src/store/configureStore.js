import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import {browserHistory} from 'react-router';
import {syncHistory} from 'react-router-redux';

const reduxRouterMiddleware = syncHistory(browserHistory);

const finalCreateStore = compose(
  applyMiddleware(reduxRouterMiddleware),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  reduxRouterMiddleware.listenForReplays(store)
  return store;
}
