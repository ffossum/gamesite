import _ from 'lodash';

export default class MessageCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.messages = [];
  }

  add(message) {
    this.messages = _.takeRight([...this.messages, message], this.maxSize);
  }

  get userIds() {
    const userIds = _.map(this.messages, message => message.user);
    return _.uniq(userIds);
  }
}

let instance;
export function getMessageCacheInstance() {
  if (!instance) {
    instance = new MessageCache();
  }

  return instance;
}
