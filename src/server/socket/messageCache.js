/* @flow */
import { map, takeRight, uniq } from 'lodash/fp';
import type { UserMessage } from 'reducers/mainChat/messagesReducer';

export default class MessageCache {
  maxSize: number;
  messages: UserMessage[];
  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
    this.messages = [];
  }

  add(message: UserMessage) {
    this.messages = takeRight(this.maxSize, [...this.messages, message]);
  }

  getUserIds() {
    const userIds = map(message => message.user, this.messages);
    return uniq(userIds);
  }
}

let instance;
export function getMessageCacheInstance() {
  if (!instance) {
    instance = new MessageCache();
  }

  return instance;
}
