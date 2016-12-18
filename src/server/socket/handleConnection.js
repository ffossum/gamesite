/* eslint no-param-reassign: 0 */

import cookie from 'cookie';
import { getUserByJwt } from '../jwt';
import { getOwnUserData } from 'util/userDataUtils';
import { LOG_OUT, LOG_IN_SUCCESS } from 'actions/login';
import { SEND_MESSAGE, NEW_MESSAGE } from 'actions/mainChat';
import {
  SEND_GAME_MESSAGE,
  NEW_GAME_MESSAGE,
} from 'actions/gameChat';
import {
  JOIN_LOBBY,
  LEAVE_LOBBY,
  REFRESH_LOBBY,
  CREATE_GAME,
  GAME_CREATED,
} from 'actions/gamesList';
import {
  JOIN_GAME,
  PLAYER_JOINED,
  LEAVE_GAME,
  PLAYER_LEFT,
  ENTER_ROOM,
  LEAVE_ROOM,
  GET_GAME_DATA,
  START_GAME,
  GAME_STARTED,
  GAME_ENDED,
  CANCEL_GAME,
  GAME_CANCELED,
} from 'actions/gameRoom';
import {
  PERFORM_ACTION,
  NEW_ACTION,
} from 'actions/game';
import games, { getUserGames } from '../db/games';
import _ from 'lodash';
import { asViewedBy } from 'games/rps/';
import {
  getGameChannelName,
  getUserChannelName,
  getSpectatorChannelName,
  getUrlChannels,
} from './channelUtils';
import jsonpatch from 'fast-json-patch';

function getJwt(request) {
  const { headers } = request;
  const cookies = headers.cookie
    ? cookie.parse(headers.cookie)
    : {};

  return cookies.jwt;
}

function joinGameChannels(socket, gameIds) {
  _.forEach(gameIds, gameId => {
    socket.leave(getSpectatorChannelName(gameId));
    socket.join(getGameChannelName(gameId));
  });
}

export default async function handleConnection(socket) {
  const urlChannels = getUrlChannels(socket);
  _.forEach(urlChannels, channel => socket.join(channel));

  const token = getJwt(socket.request);
  if (token) {
    try {
      const user = await getUserByJwt(token);

      socket.join(getUserChannelName(user.id));

      const userGames = await getUserGames(user.id);
      joinGameChannels(socket, _.keys(userGames));

      socket.emit(LOG_IN_SUCCESS, {
        user: getOwnUserData(user),
        games: userGames,
      });

      socket.user = user;
      socket.emit('news', { hello: user.username });
    } catch (e) {
      socket.emit('news', { hello: 'guest' });
    }
  } else {
    socket.emit('news', { hello: 'guest' });
  }

  socket.on(SEND_GAME_MESSAGE, message => {
    if (socket.user) {
      socket.broadcast
        .to(getGameChannelName(message.game.id))
        .to(getSpectatorChannelName(message.game.id))
        .emit(NEW_GAME_MESSAGE, {
          game: { id: message.game.id },
          message: {
            text: message.text,
            time: new Date().toJSON(),
            user: socket.user.id,
          },
        });
    }
  });

  socket.on(LOG_OUT, () => {
    socket.leave(getUserChannelName(socket.user.id));
    delete socket.user;
    socket.disconnect(true);
  });

  socket.on(CREATE_GAME, async (data, fn) => {
    if (socket.user) {
      const game = await games.create({
        data,
        host: socket.user.id,
      });

      if (game) {
        socket.join(getGameChannelName(game.id));
        socket.broadcast.to('lobby').emit(GAME_CREATED, { game });
      }

      fn(game);
    }
  });

  socket.on(JOIN_GAME, async (data, fn) => {
    if (socket.user) {
      const gameId = data.game.id;
      const joined = await games.join(gameId, socket.user.id);

      if (joined) {
        socket.leave(getSpectatorChannelName(gameId));
        socket.join(getGameChannelName(gameId));

        const emitData = {
          user: { id: socket.user.id },
          game: { id: gameId },
        };
        socket.broadcast
          .to('lobby')
          .to(getSpectatorChannelName(gameId))
          .to(getGameChannelName(gameId))
          .emit(PLAYER_JOINED, emitData);
      }
      fn(!!joined);
    } else {
      fn(false);
    }
  });

  socket.on(LEAVE_GAME, async (data, fn) => {
    if (socket.user) {
      const gameId = data.game.id;
      const left = await games.leave(gameId, socket.user.id);

      if (left) {
        socket.leave(getGameChannelName(gameId));
        socket.join(getSpectatorChannelName(gameId));

        const emitData = {
          user: { id: socket.user.id },
          game: { id: gameId },
        };
        socket.broadcast
          .to('lobby')
          .to(getSpectatorChannelName(gameId))
          .to(getGameChannelName(gameId))
          .emit(PLAYER_LEFT, emitData);
      }

      fn(!!left);
    } else {
      fn(false);
    }
  });

  socket.on(START_GAME, async (data, fn) => {
    if (socket.user) {
      const gameId = data.game.id;
      const state = await games.start(gameId, socket.user.id);

      if (state) {
        const emitData = { game: { id: gameId, state } };
        socket.broadcast.to('lobby').emit(GAME_STARTED, { game: { id: gameId } });
        socket.broadcast
          .to(getSpectatorChannelName(gameId))
          .to(getGameChannelName(gameId))
          .emit(GAME_STARTED, emitData);
      }

      fn(state ? { state } : false);
    } else {
      fn(false);
    }
  });

  socket.on(CANCEL_GAME, async (data, fn) => {
    if (socket.user) {
      const gameId = data.game.id;
      const canceled = await games.cancel(gameId, socket.user.id);

      if (canceled) {
        socket.broadcast
          .to('lobby')
          .to(getSpectatorChannelName(gameId))
          .to(getGameChannelName(gameId))
          .emit(GAME_CANCELED, data);
      }

      fn(null, canceled);
    } else {
      fn('not logged in');
    }
  });

  socket.on(PERFORM_ACTION, async (data, fn) => {
    if (socket.user) {
      const gameId = data.game.id;
      const success = await games.performGameAction(gameId, socket.user.id, data.action);

      if (!success) {
        fn('rejected');
      } else {
        const { previousState, newState, gameOver, users } = success;
        fn(null, {
          patch: jsonpatch.compare(
            asViewedBy(previousState, socket.user.id),
            asViewedBy(newState, socket.user.id),
          ),
        });
        _.forEach(users, playerId => {
          socket.broadcast.to(getUserChannelName(playerId)).emit(NEW_ACTION, {
            game: { id: gameId },
            patch: jsonpatch.compare(
              asViewedBy(previousState, playerId),
              asViewedBy(newState, playerId),
            ),
          });
        });
        socket.broadcast.to(getSpectatorChannelName(gameId)).emit(NEW_ACTION, {
          game: { id: gameId },
          patch: jsonpatch.compare(
            asViewedBy(previousState),
            asViewedBy(newState),
          ),
        });

        if (gameOver) {
          socket.emit(GAME_ENDED, {
            game: { id: gameId },
          });
          socket.broadcast
            .to(getSpectatorChannelName(gameId))
            .to(getGameChannelName(gameId))
            .emit(GAME_ENDED, {
              game: { id: gameId },
            });
        }
      }
    }
  });

  socket.on(GET_GAME_DATA, async (gameId, fn) => {
    const game = await games.get(gameId, socket.user && socket.user.id);
    fn(game);
  });

  socket.on(ENTER_ROOM, async (gameId, fn) => {
    const roomName = getGameChannelName(gameId);
    const isInRoom = socket.rooms[roomName];

    if (isInRoom) {
      fn();
      return;
    }

    const game = await games.get(gameId, socket.user && socket.user.id);
    if (game) {
      socket.join(getSpectatorChannelName(gameId));
      fn(null, game);
    } else {
      fn('not found');
    }
  });

  socket.on(LEAVE_ROOM, gameId => {
    socket.leave(getSpectatorChannelName(gameId));
  });

  socket.on(JOIN_LOBBY, async ({ lastRefreshed } = {}) => {
    socket.join('lobby');
    const result = await games.getLobbyGames({ lastRefreshed });
    socket.emit(REFRESH_LOBBY, {
      games: result.games,
      refreshed: result.refreshed,
    });
  });

  socket.on(LEAVE_LOBBY, () => {
    socket.leave('lobby');
  });
}
