import { isString, some } from 'lodash/fp';

export default function isUserInGame(game, user) {
  if (!user) {
    return false;
  }

  const userId = isString(user) ? user : user.id;
  return some(gameUser => gameUser.id === userId, game.users);
}
