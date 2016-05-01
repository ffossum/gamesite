import configureStore from './configureStore';
import Immutable from 'immutable';

export default configureStore(Immutable.fromJS(window.INITIAL_STATE));
