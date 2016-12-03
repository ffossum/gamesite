/* eslint no-unused-vars: 0 */

import socket from 'client/socket';
import { isFunction, noop } from 'lodash';

export default store => next => action => {
  if (action.meta && action.meta.deepstream) {
    const fn = action.meta.deepstream;
    if (isFunction(fn)) {
      fn(socket);
    }
  }
  next(action);
};
