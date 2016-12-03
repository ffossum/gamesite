import io from 'socket.io-client';
import deepstream from 'deepstream.io-client-js';
import { forEach, once, isFunction, union, without } from 'lodash';

let host;
let currentSocket;
let currentHandlers;
let currentHandler;
let currentEvents = [];

let currentDeepstream;

function addHandlers(socket, handlers) {
  forEach(handlers, (handler, event) => {
    socket.on(event, handler);
  });
}

function replaceHandlers(socket, handlers) {
  socket.off();
  addHandlers(socket, handlers);
}

function init(store) {
  const port = location.port ? `:${location.port}` : '';
  host = `${location.protocol}//${location.hostname}${port}`;

  currentSocket = io(host);
  currentHandlers = require('./handlers').createHandlers(store);
  currentHandler = require('./handlers').createHandler(store);

  currentDeepstream = deepstream(`ws://${location.hostname}:6020/deepstream`).login({}, () => {
    currentEvents = ['lobby', 'mainchat'];
    currentEvents.forEach(eventName => {
      currentDeepstream.event.subscribe(eventName, currentHandler);
    });
  });

  if (module.hot) {
    module.hot.accept('./handlers', () => {
      currentHandlers = require('./handlers').createHandlers(store);
      replaceHandlers(currentSocket, currentHandlers);

      const previousHandler = currentHandler;
      currentHandler = require('./handlers').createHandler(store);
      currentEvents.forEach(eventName => {
        currentDeepstream.event.unsubscribe(eventName, previousHandler);
        currentDeepstream.event.subscribe(eventName, currentHandler);
      });
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
  currentDeepstream = deepstream(`ws://${location.hostname}:6020/deepstream`).login({}, () => {
    currentEvents.forEach(eventName => {
      currentDeepstream.event.subscribe(eventName, currentHandler);
    });
  });

  currentSocket.disconnect();
  currentSocket = io(host, {
    forceNew: true,
  });
  addHandlers(currentSocket, currentHandlers);
}

export function subscribe(eventName, handler = currentHandler) {
  if (isFunction(handler)) {
    currentEvents = union(currentEvents, [eventName]);
    currentDeepstream.event.subscribe(eventName, handler);
  }
}

export function unsubscribe(eventName) {
  currentEvents = without(currentEvents, eventName);
  currentDeepstream.event.unsubscribe(eventName);
}

export default {
  init: once(init),
  emit,
  publish,
  rpc,
  reconnect,
  subscribe,
  unsubscribe,
};
