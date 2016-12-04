import io from 'socket.io-client';
import deepstream from 'deepstream.io-client-js';
import { forEach, once, isFunction, noop } from 'lodash';
import {
  userIdSelector,
  userGamesSelector,
} from 'selectors/commonSelectors';
import {
  getUserChannelName,
  getGameChannelName,
  getGameChatChannelName,
} from 'util/channelUtils';

let host;
let currentStore;
let currentSocket;
let currentHandlers;
let currentHandler;
let currentDeepstream;

function addHandlers(socket, handlers) {
  forEach(handlers, (handler, event) => {
    socket.on(event, handler);
  });
}

function getUserGames() {
  return userGamesSelector(currentStore.getState());
}

function getUserId() {
  return userIdSelector(currentStore.getState());
}

export function subscribe(eventName, handler = currentHandler) {
  if (isFunction(handler)) {
    currentDeepstream.event.subscribe(eventName, handler);
  }
}

export function unsubscribe(eventName) {
  currentDeepstream.event.unsubscribe(eventName);
}

function init(store) {
  currentStore = store;
  const port = location.port ? `:${location.port}` : '';
  host = `${location.protocol}//${location.hostname}${port}`;

  currentSocket = io(host);
  currentHandlers = require('./handlers').createHandlers(currentStore);
  currentHandler = require('./handlers').createHandler(currentStore);

  const games = getUserGames();

  return new Promise(resolve => {
    currentDeepstream = deepstream(`ws://${location.hostname}:6020/deepstream`).login({}, () => {
      subscribe('mainchat');
      const userId = getUserId();
      if (userId) {
        subscribe(getUserChannelName(userId));
      }

      forEach(games, game => {
        subscribe(getGameChannelName(game.id));
        subscribe(getGameChatChannelName(game.id));
      });
      // TODO join game channel if currently on game page
      resolve();
    });
  });
}

export function emit(...rest) {
  currentSocket.emit(...rest);
}

export function publish(eventName, data) {
  currentDeepstream.event.emit(eventName, data);
}

export function rpc(procedureName, data, fn = noop) {
  currentDeepstream.rpc.make(procedureName, data, fn);
}


export function reconnect({ games = getUserGames() } = {}) {
  currentSocket.disconnect();
  currentSocket = io(host, {
    forceNew: true,
  });
  addHandlers(currentSocket, currentHandlers);

  currentDeepstream.close();
  return new Promise(resolve => {
    currentDeepstream = deepstream(`ws://${location.hostname}:6020/deepstream`).login({}, () => {
      subscribe('mainchat');
      const userId = getUserId();
      if (userId) {
        subscribe(getUserChannelName(userId));
      }
      forEach(games, game => {
        subscribe(getGameChannelName(game.id));
        subscribe(getGameChatChannelName(game.id));
      });
      // TODO join game channel if currently on game page
      resolve();
    });
  });
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
