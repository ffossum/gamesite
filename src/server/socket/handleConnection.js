/* eslint no-param-reassign: 0 */

import cookie from 'cookie';
import { getUserByJwt } from '../jwt';
import getPublicUserData from '../../util/getPublicUserData';
import { LOG_OUT, LOG_IN_SUCCESS } from 'actions/login';
import { SEND_MESSAGE, NEW_MESSAGE } from 'actions/mainChat';
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
  ENTER_ROOM,
  LEAVE_ROOM,
  REFRESH_GAME,
} from 'actions/gameRoom';
import games from '../games';
import {
  getUserGames,
} from '../games';
import _ from 'lodash';

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

async function joinGameChannels(socket, userId) {
  try {
    const gameIds = await getUserGames(userId);
    _.forEach(gameIds, gameId => {
      socket.join(getGameChannelName(gameId));
    });
  } catch (e) {
    // do nothing
  }
}

export default async function handleConnection(socket) {
  const token = getJwt(socket.request);
  try {
    const user = await getUserByJwt(token);
    socket.user = user;

    socket.join('users');
    socket.join(getUserChannelName(user.id));

    joinGameChannels(socket, user.id);

    socket.emit('news', { hello: user.username });
    socket.emit(LOG_IN_SUCCESS, {
      user: getPublicUserData(socket.user),
    });
  } catch (e) {
    socket.emit('news', { hello: 'guest' });
  }

  socket.on(SEND_MESSAGE, message => {
    socket.broadcast.emit(NEW_MESSAGE, {
      text: message.text,
      time: new Date().toJSON(),
      user: socket.user.id,
    });
  });

  socket.on(LOG_OUT, () => {
    socket.leave('users');
    socket.leave(getUserChannelName(socket.user.id));
    delete socket.user;
    socket.disconnect(true);
  });

  socket.on(CREATE_GAME, (data, fn) => {
    if (socket.user) {
      const game = games.create({
        host: socket.user.id,
      });

      socket.join(getGameChannelName(game.id));
      socket.broadcast.to('lobby').emit(GAME_CREATED, { game });

      fn({ game });
    }
  });

  socket.on(JOIN_GAME, (data, fn) => {
    if (socket.user) {
      const gameId = data.game.id;
      const joined = games.join(gameId, socket.user.id);

      if (joined) {
        socket.join(getGameChannelName(gameId));

        const emitData = {
          user: { id: socket.user.id },
          game: { id: gameId },
        };
        socket.broadcast.to('lobby').emit(PLAYER_JOINED, emitData);
        socket.broadcast.to(getGameChannelName(gameId)).emit(PLAYER_JOINED, emitData);
      }
      fn(!!joined);
    } else {
      fn(false);
    }
  });

  socket.on(ENTER_ROOM, gameId => {
    socket.join(getGameChannelName(gameId));
    const game = games.get(gameId);
    socket.emit(REFRESH_GAME, { game });
  });

  socket.on(LEAVE_ROOM, gameId => {
    socket.leave(getGameChannelName(gameId));
  });

  socket.on(JOIN_LOBBY, () => {
    socket.join('lobby');
    socket.emit(REFRESH_LOBBY, {
      games: games.getJoinable(),
    });
  });

  socket.on(LEAVE_LOBBY, () => {
    socket.leave('lobby');
  });
}
