/* eslint no-unused-vars: 0 */

import socket from 'client/socket';
import { isFunction, noop } from 'lodash';

export default store => next => action => {
  if (action.meta && action.meta.deepstream) {
    const { rpc, event } = action.meta.deepstream;

    if (rpc) {
      const fn = isFunction(rpc) ? rpc : noop;
      socket.rpc(action.type, action.payload, rpc);
    } else if (event) {
      socket.publish(event, [action.type, action.payload]);
    }
  }

  next(action);
};
