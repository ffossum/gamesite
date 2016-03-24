import { combineReducers } from 'redux-immutablejs';
import inProgress from './inProgress/inProgressReducer';
import notStarted from './notStarted/notStartedReducer';

export default combineReducers({
  notStarted,
  inProgress,
});
