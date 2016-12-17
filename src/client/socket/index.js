import deepstream from 'deepstream.io-client-js';
import { forEach, once, noop } from 'lodash';
import {
  userIdSelector,
  userGamesSelector,
} from 'selectors/commonSelectors';
import {
  getUserChannelName,
  getGameChannelName,
} from 'util/channelUtils';

let currentStore;
let currentHandler;
let currentDeepstream;

const currentHandlerSubscriptionCounts = {};

function getUserGames() {
  return userGamesSelector(currentStore.getState());
}

function getUserId() {
  return userIdSelector(currentStore.getState());
}

export function subscribe(eventName, handler = currentHandler) {
  if (handler === currentHandler) {
    let count = currentHandlerSubscriptionCounts[eventName] || 0;
    count++;
    currentHandlerSubscriptionCounts[eventName] = count;
    if (count === 1) {
      currentDeepstream.event.subscribe(eventName, handler);
    }
  } else {
    currentDeepstream.event.subscribe(eventName, handler);
  }
}

export function unsubscribe(eventName, handler = currentHandler) {
  try {
    if (handler === currentHandler) {
      let count = currentHandlerSubscriptionCounts[eventName] || 0;
      if (count === 0) {
        return;
      }
      count--;
      currentHandlerSubscriptionCounts[eventName] = count;
      if (count === 0) {
        currentDeepstream.event.unsubscribe(eventName, handler);
      }
    } else {
      currentDeepstream.event.unsubscribe(eventName, handler);
    }
  } catch (err) {
    // do nothing
  }
}

function init(store) {
  currentStore = store;
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
      });

      resolve();
    });
  });
}

export function publish(eventName, data) {
  currentDeepstream.event.emit(eventName, data);
}

export function rpc(procedureName, data, fn = noop) {
  currentDeepstream.rpc.make(procedureName, data, fn);
}

export default {
  init: once(init),
  publish,
  rpc,
  subscribe,
  unsubscribe,
};
