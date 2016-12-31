import deepstream from 'deepstream.io-client-js';
import { forEach, once } from 'lodash/fp';
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

  const games = userGamesSelector(currentStore.getState());

  return new Promise(resolve => {
    let host = location.hostname;
    if (!__DOCKER__) {
      host += ':6020';
    }
    const state = currentStore.getState();
    const userId = userIdSelector(state);
    // TODO use jwt cookie to send user data
    currentDeepstream = deepstream(`${host}/deepstream`).login({
      id: userId,
    }, () => {
      subscribe('mainchat');
      if (userId) {
        subscribe(getUserChannelName(userId));
      }

      forEach(game => {
        subscribe(getGameChannelName(game.id));
      }, games);

      resolve();
    });
  });
}

export function publish(eventName, data) {
  currentDeepstream.event.emit(eventName, data);
}

export function rpc(procedureName, data) {
  return new Promise((resolve, reject) => {
    currentDeepstream.rpc.make(procedureName, data, (err, res) => (
      err ? reject(err) : resolve(res))
    );
  });
}

export default {
  init: once(init),
  publish,
  rpc,
  subscribe,
  unsubscribe,
};
