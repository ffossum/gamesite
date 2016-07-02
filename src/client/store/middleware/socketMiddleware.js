/* eslint no-unused-vars: 0 */

import socket from 'client/socket';
import _ from 'lodash';

export default store => next => action => {
  if (action.meta && action.meta.socket) {
    const args = [action.type, action.payload || ''];
    if (_.isFunction(action.meta.socket)) {
      args.push(action.meta.socket);
    }
    socket.emit(...args);
  }

  next(action);
};
