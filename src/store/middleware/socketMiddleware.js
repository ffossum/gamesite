/* eslint no-unused-vars: 0 */

import socket from 'client/socket';

export default store => next => action => {
  if (action.meta && action.meta.socket) {
    socket.emit(action.type, action.payload || '');
  }
  next(action);
};
