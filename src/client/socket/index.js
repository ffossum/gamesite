import io from 'socket.io-client';
import _ from 'lodash';
let handlers = require('./handlers').default;

let host;
let socket = {};

if (__CLIENT__) {
  host = `${location.protocol}//${location.hostname}:8080`;
  socket = io(host);
  addHandlers(socket, handlers);
}

if (module.hot) {
  module.hot.accept('./handlers', () => {
    handlers = require('./handlers').default;
    replaceHandlers(socket, handlers);
  });
}

export function emit() {
  socket.emit(...arguments);
}

export function on() {
  socket.on(...arguments);
}

export function reconnect() {
  socket.disconnect();
  socket = io(host, {forceNew: true});
  addHandlers(socket, handlers);
}

export default {
  emit,
  on,
  reconnect
}

function addHandlers(socket, handlers) {
  _.forEach(handlers, (handler, event) => {
    socket.on(event, handler);
  });
}

function replaceHandlers(socket, handlers) {
  socket.off();
  addHandlers(socket, handlers);
}
