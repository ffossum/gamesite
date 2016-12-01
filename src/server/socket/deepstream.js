import server from './deepstreamServer';
import deepstreamClient from './deepstreamClient';
import { getMessageCacheInstance } from './messageCache';
import { once } from 'lodash';
import { SEND_MESSAGE } from 'actions/mainChat';
import { JOIN_LOBBY } from 'actions/gamesList';
import games from '../db/games';

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

  client.rpc.provide(JOIN_LOBBY, async (data, res) => {
    const { lastRefreshed } = data;
    const result = await games.getLobbyGames({ lastRefreshed });
    res.send({
      games: result.games,
      refreshed: result.refreshed,
    });
  });
});

export default {
  init,
};
