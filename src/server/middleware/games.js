/* eslint no-param-reassign: 0 */

import shortid from 'shortid';
import socket from '../socket';
import { GAME_CREATED } from 'actions/gamesList';

const games = {};

export async function listGames(ctx) {
  ctx.body = { games };
}

export async function createGame(ctx) {
  const userId = ctx.req.user.id;
  console.log(`${userId} created a new game!`);

  const gameId = shortid.generate();
  const game = {
    id: gameId,
    host: userId,
    messages: [],
  };

  games[gameId] = game;
  socket.to('lobby').emit(GAME_CREATED, { game });

  ctx.body = {
    game: {
      id: gameId,
    },
  };
  ctx.status = 201;
}
