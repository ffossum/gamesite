/* eslint no-unused-vars: 0 */

import socket from 'client/socket';
import { isFunction, noop } from 'lodash';

export default store => next => action => {
  if (action.meta && action.meta.deepstream) {
    const { rpc, publish } = action.meta.deepstream;

    if (rpc) {
      const fn = isFunction(rpc) ? rpc : noop;
      socket.rpc(action.type, action.payload, rpc);
    } else if (publish) {
      const eventName = publish;
      socket.publish(eventName, [action.type, action.payload]);
    }
  }

  next(action);
};
