import io from 'socket.io-client';
import deepstream from 'deepstream.io-client-js';
import { forEach, once } from 'lodash';

let host;
let currentSocket;
let currentHandlers;

let currentDeepstream;

function addHandlers(deepstreamClient, socket, handlers) {
  forEach(handlers, (handler, event) => {
    socket.on(event, handler);
    deepstreamClient.event.subscribe(event, handler);
  });
}

function replaceHandlers(deepstreamClient, socket, previousHandlers, handlers) {
  forEach(previousHandlers, (handler, event) => {
    deepstreamClient.event.unsubscribe(event);
  });
  socket.off();
  addHandlers(deepstreamClient, socket, handlers);
}

function init(store) {
  const port = location.port ? `:${location.port}` : '';
  host = `${location.protocol}//${location.hostname}${port}`;

  currentSocket = io(host);
  currentHandlers = require('./handlers').createHandlers(store);

  currentDeepstream = deepstream(`ws://${location.hostname}:6020/deepstream`).login({}, () => {
    addHandlers(currentDeepstream, currentSocket, currentHandlers);
  });

  if (module.hot) {
    module.hot.accept('./handlers', () => {
      const previousHandlers = currentHandlers;
      currentHandlers = require('./handlers').createHandlers(store);
      replaceHandlers(currentDeepstream, currentSocket, previousHandlers, currentHandlers);
    });
  }
}

export function emit(...rest) {
  currentSocket.emit(...rest);
}

export function publish(eventName, data) {
  currentDeepstream.event.emit(eventName, data);
}

export function rpc(procedureName, data, fn) {
  currentDeepstream.rpc.make(procedureName, data, fn);
}

export function reconnect() {
  currentDeepstream.close();
  currentDeepstream = deepstream(`ws://${location.hostname}:6020/deepstream`).login();

  currentSocket.disconnect();
  currentSocket = io(host, {
    forceNew: true,
  });
  addHandlers(currentSocket, currentHandlers);
}

export default {
  init: once(init),
  emit,
  publish,
  rpc,
  reconnect,
};
