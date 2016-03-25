/* eslint no-param-reassign: 0 */

import socket from '../socket';
import { GAME_CREATED } from 'actions/gamesList';
import games from '../games';

export async function createGame(ctx) {
  const userId = ctx.req.user.id;

  const game = games.create({
    host: userId,
  });

  socket.to('lobby').emit(GAME_CREATED, { game });

  ctx.body = {
    game: {
      id: game.id,
    },
  };
  ctx.status = 201;
}
