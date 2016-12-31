import {
  map,
  get,
} from 'lodash/fp';

const getUser = (userData, userId) => userData[userId] || { id: userId };

export const addUserDataToGame = userData => game => ({
  ...game,
  users: map(userId => getUser(userData, userId), game.users),
});

export const addUserDataToMessage = userData => message => ({
  ...message,
  user: getUser(userData, message.user),
  args: message.args && map(arg => get([arg.user, 'username'], userData), message.args),
});
