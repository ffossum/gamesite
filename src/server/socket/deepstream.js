import server from './deepstreamServer';
import deepstreamClient from './deepstreamClient';
import { getMessageCacheInstance } from './messageCache';
import { once } from 'lodash';
import { SEND_MESSAGE } from 'actions/mainChat';

export const init = once(async () => {
  await server.init();
  const client = await deepstreamClient.init();

  const messageCache = getMessageCacheInstance();

  client.event.subscribe('mainchat', ([type, payload]) => {
    switch (type) {
      case SEND_MESSAGE: {
        const message = {
          ...payload,
          time: new Date().toJSON(),
        };

        messageCache.add(message);
        break;
      }
      default:
    }
  });
});

export default {
  init,
};
