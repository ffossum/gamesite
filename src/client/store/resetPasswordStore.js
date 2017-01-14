import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from 'reducers/resetPasswordReducer';
import saga from './sagas/resetPasswordSaga';

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

const store = finalCreateStore(reducer);

sagaMiddleware.run(saga);

export default store;
