import server from './deepstreamServer';
import deepstreamClient from './deepstreamClient';
import { getMessageCacheInstance } from './messageCache';
import { once } from 'lodash';
import { SEND_MESSAGE } from 'actions/mainChat';
import {
  JOIN_LOBBY,
  CREATE_GAME,
  GAME_CREATED,
  UPDATE_GAME,
} from 'actions/gamesList';
import {
  JOIN_GAME,
  PLAYER_JOINED,
  LEAVE_GAME,
  PLAYER_LEFT,
  ENTER_ROOM,
  LEAVE_ROOM,
  START_GAME,
  GAME_STARTED,
  CANCEL_GAME,
  GAME_CANCELED,
} from 'actions/gameRoom';
import {
  SEND_GAME_MESSAGE,
  NEW_GAME_MESSAGE,
} from 'actions/gameChat';
import {
  IN_PROGRESS,
  CANCELED,
} from 'constants/gameStatus';
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
      client.event.emit('lobby', [UPDATE_GAME, {
        id: game.id,
        users: joined.users,
      }]);
    }
    res.send(!!joined);
  });

  client.rpc.provide(LEAVE_GAME, async (data, res) => {
    const { user, game } = data;
    const left = await games.leave(game.id, user.id);
    if (left) {
      client.event.emit(getGameChannelName(game.id), [PLAYER_LEFT, data]);
      client.event.emit('lobby', [UPDATE_GAME, {
        id: game.id,
        users: left.users,
      }]);
    }
    res.send(!!left);
  });

  client.rpc.provide(ENTER_ROOM, async (data, res) => {
    const { user, game } = data;
    const gameData = await games.get(game.id, user.id);
    res.send(gameData);
  });

  client.rpc.provide(START_GAME, async (data, res) => {
    const { user, game } = data;
    const state = await games.start(game.id, user.id);

    if (state) {
      client.event.emit(getGameChannelName(game.id), [GAME_STARTED, {
        startedBy: user.id,
        game: {
          id: game.id,
          state,
        },
      }]);
      client.event.emit('lobby', [UPDATE_GAME, {
        id: game.id,
        status: IN_PROGRESS,
      }]);
    }
    res.send(!!state);
  });

  client.rpc.provide(CANCEL_GAME, async (data, res) => {
    const { game, user } = data;
    const canceled = await games.cancel(game.id, user.id);

    if (canceled) {
      client.event.emit(getGameChannelName(game.id), [GAME_CANCELED, {
        canceledBy: user.id,
        game: {
          id: game.id,
        },
      }]);
      client.event.emit('lobby', [UPDATE_GAME, {
        id: game.id,
        status: CANCELED,
        users: [],
      }]);
    }
    res.send(canceled);
  });
});

export default {
  init,
};
