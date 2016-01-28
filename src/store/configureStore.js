import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const finalCreateStore = compose(
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  return store;
}
