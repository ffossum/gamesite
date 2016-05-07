/* eslint no-param-reassign: 0 */

import cookie from 'cookie';
import { getUserByJwt } from '../jwt';
import getPublicUserData from '../../util/getPublicUserData';
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
} from 'actions/gameRoom';
import games, { getUserGames } from '../db/games';
import _ from 'lodash';
import { isLobbyRoute, getGameIdFromRoute } from 'util/routeUtils';
import isInRoom from './isInRoom';

function getJwt(request) {
  const { headers } = request;
  const cookies = headers.cookie
    ? cookie.parse(headers.cookie)
    : {};

  return cookies.jwt;
}

function getUserChannelName(userId) {
  return `user:${userId}`;
}

function getGameChannelName(gameId) {
  return `game:${gameId}`;
}

function getSpectatorChannelName(gameId) {
  return `spectator:${gameId}`;
}

function joinGameChannels(socket, gameIds) {
  _.forEach(gameIds, gameId => {
    socket.leave(getSpectatorChannelName(gameId));
    socket.join(getGameChannelName(gameId));
  });
}

/*
Join channels based on url.
Useful when socket reconnects without page refresh.
*/
function joinUrlChannels(socket) {
  const { referer } = socket.request.headers;
  if (isLobbyRoute(referer)) {
    socket.join('lobby');
  }
  const gameId = getGameIdFromRoute(referer);
  if (gameId) {
    socket.join(getSpectatorChannelName(gameId));
  }
}

export default async function handleConnection(socket) {
  joinUrlChannels(socket);

  const token = getJwt(socket.request);
  try {
    const user = await getUserByJwt(token);
    socket.user = user;

    socket.join(getUserChannelName(user.id));

    const userGames = await getUserGames(user.id);
    joinGameChannels(socket, _.keys(userGames));

    socket.emit('news', { hello: user.username });
    socket.emit(LOG_IN_SUCCESS, {
      user: getPublicUserData(socket.user),
      games: userGames,
    });
  } catch (e) {
    socket.emit('news', { hello: 'guest' });
  }

  socket.on(SEND_MESSAGE, message => {
    if (socket.user) {
      socket.broadcast.emit(NEW_MESSAGE, {
        text: message.text,
        time: new Date().toJSON(),
        user: socket.user.id,
      });
    }
  });

  socket.on(SEND_GAME_MESSAGE, message => {
    if (socket.user) {
      socket.broadcast.to(getGameChannelName(message.game.Id)).emit(NEW_GAME_MESSAGE, {
        game: { id: message.gameId },
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
      const { options, custom } = data;
      const game = await games.create({
        host: socket.user.id,
        options,
        custom,
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

  socket.on(GET_GAME_DATA, async (gameId, fn) => {
    const game = await games.get(gameId, socket.user && socket.user.id);
    fn(game);
  });

  socket.on(ENTER_ROOM, async (gameId, fn) => {
    const inGame = isInRoom(socket, getGameChannelName(gameId));

    if (!inGame) {
      const game = await games.get(gameId, socket.user && socket.user.id);
      if (game) {
        socket.join(getSpectatorChannelName(gameId));
        fn(null, game);
      } else {
        fn('not found');
      }
    } else {
      fn();
    }
  });

  socket.on(LEAVE_ROOM, gameId => {
    socket.leave(getSpectatorChannelName(gameId));
  });

  socket.on(JOIN_LOBBY, async () => {
    socket.join('lobby');
    socket.emit(REFRESH_LOBBY, {
      games: await games.getNotStarted(),
    });
  });

  socket.on(LEAVE_LOBBY, () => {
    socket.leave('lobby');
  });
}
