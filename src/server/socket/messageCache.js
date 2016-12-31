import { map, takeRight, uniq } from 'lodash/fp';

export default class MessageCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.messages = [];
  }

  add(message) {
    this.messages = takeRight(this.maxSize, [...this.messages, message]);
  }

  get userIds() {
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
