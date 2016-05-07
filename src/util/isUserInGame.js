import _ from 'lodash';

export default function isUserInGame(game, user) {
  if (!user) {
    return false;
  }

  const userId = _.isString(user) ? user : user.id;
  return _.some(game.users, gameUser => gameUser.id === userId);
}
