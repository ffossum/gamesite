import EventEmitter from 'events';
import { get, memoize } from 'lodash/fp';
import Deepstream, { constants as C } from 'deepstream.io';
import {
  PERFORM_ACTION,
} from 'actions/game';
import {
  SEND_GAME_MESSAGE,
} from 'actions/gameChat';
import {
  ENTER_ROOM,
  JOIN_GAME,
  LEAVE_GAME,
  START_GAME,
  CANCEL_GAME,
} from 'actions/gameRoom';
import {
  CREATE_GAME,
} from 'actions/lobbyActions';
import {
  SEND_MESSAGE,
} from 'actions/mainChat';

const convertTyped = memoize(Deepstream.prototype.convertTyped);

const typesRequiringUserId = new Set([
  PERFORM_ACTION,
  SEND_GAME_MESSAGE,
  ENTER_ROOM,
  JOIN_GAME,
  LEAVE_GAME,
  START_GAME,
  CANCEL_GAME,
  CREATE_GAME,
  SEND_MESSAGE,
]);

function isEventRequest(message) {
  return message.topic === C.TOPIC.EVENT && message.action === C.ACTIONS.EVENT;
}

function isRpcRequest(message) {
  return message.topic === C.TOPIC.RPC && message.action === C.ACTIONS.REQUEST;
}

function getType(message) {
  if (isEventRequest(message)) {
    const data = convertTyped(message.data[1]);
    return data && data[0];
  } else if (isRpcRequest(message)) {
    return get(['data', 1], message);
  }

  return null;
}

function userIdRequired(message) {
  const type = getType(message);
  return typesRequiringUserId.has(type);
}

function getUserId(message) {
  if (isEventRequest(message)) {
    const data = convertTyped(message.data[1]);
    return get([1, 'user', 'id'], data);
  } else if (isRpcRequest(message)) {
    const data = convertTyped(message.data[2]);
    return get(['user', 'id'], data);
  }

  return null;
}

export default class PermissionHandler extends EventEmitter {
  constructor() {
    super();
    this.isReady = true;
    this.emit('ready');
  }
  canPerformAction(socketUserId, message, callback) {
    if (socketUserId === 'node server') {
      callback(null, true);
    } else if (userIdRequired(message)) {
      const messageUserId = getUserId(message);
      const allow = socketUserId ? messageUserId === socketUserId : false;
      callback(null, allow);
    } else {
      callback(null, true);
    }
  }
}
