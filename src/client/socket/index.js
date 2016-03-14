import io from 'socket.io-client';
import _ from 'lodash';

let host;
let currentSocket;
let currentHandlers;

function addHandlers(socket, handlers) {
  _.forEach(handlers, (handler, event) => {
    socket.on(event, handler);
  });
}

function replaceHandlers(socket, handlers) {
  socket.off();
  addHandlers(socket, handlers);
}

function init(store) {
  host = `${location.protocol}//${location.hostname}:8080`;
  currentSocket = io(host);
  currentHandlers = require('./handlers').createHandlers(store);

  addHandlers(currentSocket, currentHandlers);

  if (module.hot) {
    module.hot.accept('./handlers', () => {
      currentHandlers = require('./handlers').createHandlers(store);
      replaceHandlers(currentSocket, currentHandlers);
    });
  }
}

export function emit(...rest) {
  currentSocket.emit(...rest);
}

export function on(...rest) {
  currentSocket.on(...rest);
}

export function reconnect() {
  currentSocket.disconnect();
  currentSocket = io(host, {
    forceNew: true,
  });
  addHandlers(currentSocket, currentHandlers);
}

export default {
  init: _.once(init),
  emit,
  on,
  reconnect,
};
