/* eslint no-param-reassign: 0 */

import cookie from 'cookie';
import { getUserByJwt } from '../jwt';
import getPublicUserData from '../../util/getPublicUserData';
import { LOG_OUT, LOG_IN_SUCCESS } from 'actions/login';
import { SEND_MESSAGE, NEW_MESSAGE } from 'actions/mainChat';
import { JOIN_LOBBY, LEAVE_LOBBY, REFRESH_LOBBY } from 'actions/gamesList';
import {
  JOIN_GAME,
  PLAYER_JOINED,
} from 'actions/gameRoom';
import games from '../games';

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

export default function handleConnection(socket) {
  const token = getJwt(socket.request);
  getUserByJwt(token)
    .then(user => {
      socket.user = user;

      socket.join('users');
      socket.join(getUserChannelName(user.id));

      socket.emit('news', { hello: user.username });
      socket.emit(LOG_IN_SUCCESS, {
        user: getPublicUserData(socket.user),
      });
    })
    .catch(() => {
      socket.emit('news', { hello: 'guest' });
    });

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
