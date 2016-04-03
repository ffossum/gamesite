/* eslint no-unused-vars: 0 */

import { browserHistory } from 'react-router';

export default store => next => action => {
  if (action.meta && action.meta.history) {
    const method = action.meta.history.method;
    const args = action.meta.history.args || [];
    browserHistory[method](...args);
  }
  next(action);
};
