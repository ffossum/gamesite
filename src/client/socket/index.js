import io from 'socket.io-client';
import _ from 'lodash';

let host;
let socket;
let handlers;

function init(store) {
  host = `${location.protocol}//${location.hostname}:8080`;
  socket = io(host);
  handlers = require('./handlers').createHandlers(store);

  addHandlers(socket, handlers);

  if (module.hot) {
    module.hot.accept('./handlers', () => {
      handlers = require('./handlers').createHandlers(store);
      replaceHandlers(socket, handlers);
    });
  }
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
  init: _.once(init),
  emit,
  on,
  reconnect
};

function addHandlers(socket, handlers) {
  _.forEach(handlers, (handler, event) => {
    socket.on(event, handler);
  });
}

function replaceHandlers(socket, handlers) {
  socket.off();
  addHandlers(socket, handlers);
}
