import { combineReducers } from 'redux-immutablejs';
import inProgress from './inProgress/inProgressReducer';
import notStarted from './notStarted/notStartedReducer';
import notFound from './notFound/notFoundReducer';

export default combineReducers({
  notStarted,
  inProgress,
  notFound,
});
