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
import {
  JOIN_GAME,
  PLAYER_JOINED,
  LEAVE_GAME,
  PLAYER_LEFT,
} from 'actions/gameRoom';
import games from '../db/games';
import { getGameChannelName } from 'util/channelUtils';

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
      host: data.user, // TODO change user format to { user: { id: 'asdf'} }
    });
    if (game) {
      client.event.emit('lobby', [GAME_CREATED, game]);
      res.send(game);
    } else {
      res.error();
    }
  });

  client.rpc.provide(JOIN_GAME, async (data, res) => {
    const { user, game } = data;
    const joined = await games.join(game.id, user.id);
    if (joined) {
      client.event.emit(getGameChannelName(game.id), [PLAYER_JOINED, data]);
    }
    res.send(joined);
  });

  client.rpc.provide(LEAVE_GAME, async (data, res) => {
    const { user, game } = data;
    const left = await games.leave(game.id, user.id);
    if (left) {
      client.event.emit(getGameChannelName(game.id), [PLAYER_LEFT, data]);
    }
    res.send(left);
  });
});


export default {
  init,
};
