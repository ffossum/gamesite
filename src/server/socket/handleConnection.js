/* eslint no-param-reassign: 0 */

import cookie from 'cookie';
import { getUserByJwt } from '../jwt';
import getPublicUserData from '../../util/getPublicUserData';
import { LOG_OUT, LOG_IN_SUCCESS } from 'actions/login';
import { SEND_MESSAGE, NEW_MESSAGE } from 'actions/mainChat';
import { JOIN_LOBBY, LEAVE_LOBBY, REFRESH_LOBBY } from 'actions/gamesList';
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

      socket.on(SEND_MESSAGE, message => {
        socket.broadcast.emit(NEW_MESSAGE, {
          text: message.text,
          time: new Date().toJSON(),
          user: {
            emailHash: socket.user.emailHash,
            username: socket.user.username,
          },
        });
      });
      socket.on(LOG_OUT, () => {
        socket.leave('users');
        socket.leave(getUserChannelName(socket.user.id));
        delete socket.user;
      });
    })
    .catch(() => {
      socket.emit('news', { hello: 'guest' });
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
