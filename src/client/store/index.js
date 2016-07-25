import configureStore from './configureStore';
import { fromJSON } from 'transit-immutable-js';

export default configureStore(fromJSON(window.INITIAL_STATE));
