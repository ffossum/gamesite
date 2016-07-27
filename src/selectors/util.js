import {
  map,
  get,
} from 'lodash';

const getUser = (userData, userId) => userData[userId] || { id: userId };

export const addUserDataToGame = userData => game => ({
  ...game,
  users: map(game.users, userId => getUser(userData, userId)),
});

export const addUserDataToMessage = userData => message => ({
  ...message,
  user: getUser(userData, message.user),
  args: message.args && map(message.args, arg => get(userData, [arg.user, 'username'])),
});
