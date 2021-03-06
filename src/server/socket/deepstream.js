// @flow
import server from './deepstreamServer';
import deepstreamClient from './deepstreamClient';
import { getMessageCacheInstance } from './messageCache';
import { once, forEach } from 'lodash/fp';
import { SEND_MESSAGE } from 'actions/mainChatActions';
import {
  JOIN_LOBBY,
  CREATE_GAME,
  GAME_CREATED,
  UPDATE_GAME,
} from 'actions/lobbyActions';
import {
  JOIN_GAME,
  PLAYER_JOINED,
  LEAVE_GAME,
  PLAYER_LEFT,
  ENTER_ROOM,
  START_GAME,
  GAME_STARTED,
  CANCEL_GAME,
  GAME_CANCELED,
  GAME_ENDED,
} from 'actions/gameRoomActions';
import {
  PERFORM_ACTION,
  NEW_ACTION,
} from 'actions/gameActions';
import {
  IN_PROGRESS,
  CANCELED,
} from 'constants/gameStatus';
import games from '../db/games';
import {
  getGameChannelName,
  getSpectatorChannelName,
  getUserChannelName,
} from 'util/channelUtils';
import { asViewedBy } from 'games/rps/';
import jsonpatch from 'fast-json-patch';

export const init = once(async () => {
  await server.init();
  const client = await deepstreamClient.init();

  const messageCache = getMessageCacheInstance();

  client.event.subscribe('mainchat', ([type, payload]) => {
    switch (type) {
      case SEND_MESSAGE: {
        const message = {
          ...payload,
          user: payload.user.id,
          time: new Date().toJSON(),
        };

        messageCache.add(message);
        break;
      }
      default:
    }
  });

  client.rpc.provide(JOIN_LOBBY, async (data, res) => {
    const result = await games.getLobbyGames();
    res.send({
      games: result.games,
    });
  });

  client.rpc.provide(CREATE_GAME, async (data, res) => {
    const game = await games.create({
      data: data.game,
      host: data.user.id,
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

  client.rpc.provide(PERFORM_ACTION, async (data, res) => {
    const { game, user } = data;
    const success = await games.performGameAction(game.id, user.id, data.action);
    if (!success) {
      res.error();
    } else {
      const { previousState, newState, gameOver, users } = success;
      forEach(playerId => {
        client.event.emit(getUserChannelName(playerId), [NEW_ACTION, {
          game: { id: game.id },
          patch: jsonpatch.compare(
            asViewedBy(previousState, playerId),
            asViewedBy(newState, playerId),
          ),
        }]);
      }, users);
      client.event.emit(getSpectatorChannelName(game.id), [NEW_ACTION, {
        game: { id: game.id },
        patch: jsonpatch.compare(
          asViewedBy(previousState),
          asViewedBy(newState),
        ),
      }]);
      if (gameOver) {
        client.event.emit(getGameChannelName(game.id), [GAME_ENDED, {
          game: { id: game.id },
        }]);
      }
      res.send();
    }
  });
});

export default {
  init,
};
