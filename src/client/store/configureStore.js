import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/';
import DevTools from 'containers/DevTools';
import socketMiddleware from './middleware/socketMiddleware';
import historyMiddleware from './middleware/historyMiddleware';
import gameRoomMiddleware from './middleware/gameRoomMiddleware';

const finalCreateStore = compose(
  applyMiddleware(
    thunk,
    socketMiddleware,
    historyMiddleware,
    gameRoomMiddleware,
  ),
  DevTools.instrument(),
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
