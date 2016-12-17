/* eslint no-param-reassign: 0 */

import cookie from 'cookie';
import { getUserByJwt } from '../jwt';

import { getUserGames } from '../db/games';
import _ from 'lodash';
import {
  getGameChannelName,
  getUserChannelName,
  getSpectatorChannelName,
  getUrlChannels,
} from 'util/channelUtils';

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

      socket.user = user;
      socket.emit('news', { hello: user.username });
    } catch (e) {
      socket.emit('news', { hello: 'guest' });
    }
  } else {
    socket.emit('news', { hello: 'guest' });
  }
}
