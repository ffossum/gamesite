import server from './deepstreamServer';
import deepstreamClient from './deepstreamClient';
import { getMessageCacheInstance } from './messageCache';
import { once } from 'lodash';
import { SEND_MESSAGE } from 'actions/mainChat';
import {
  JOIN_LOBBY,
  CREATE_GAME,
  GAME_CREATED,
} from 'actions/gamesList';
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

  client.rpc.provide(CREATE_GAME, async (data, res) => {
    const game = await games.create({
      data: data.game,
      host: data.user,
    });
    if (game) {
      client.event.emit('lobby', [GAME_CREATED, game]);
      res.send(game);
    } else {
      res.error();
    }
  });
});

export default {
  init,
};
