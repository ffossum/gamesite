/* eslint no-param-reassign: 0 */

import cookie from 'cookie';
import { getUserByJwt } from '../jwt';
import { LOG_OUT } from 'actions/login';
import {
  SEND_GAME_MESSAGE,
  NEW_GAME_MESSAGE,
} from 'actions/gameChat';
import {
  JOIN_GAME,
  PLAYER_JOINED,
  LEAVE_GAME,
  PLAYER_LEFT,
  ENTER_ROOM,
  LEAVE_ROOM,
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
} from 'util/channelUtils';
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

      socket.user = user;
      socket.emit('news', { hello: user.username });
    } catch (e) {
      socket.emit('news', { hello: 'guest' });
    }
  } else {
    socket.emit('news', { hello: 'guest' });
  }

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
}
