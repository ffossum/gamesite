const getUser = (userData, userId) => userData.get(userId) || { id: userId };

export const addUserDataToGame = userData =>
  game => (
    game.update('users', users => (
      users.map(userId => getUser(userData, userId))
    ))
  );

export const addUserDataToMessage = userData =>
  message => message
    .update('user', userId => getUser(userData, userId))
    .update('args', args => (
      args && args.map(arg => {
        const userId = arg.get('user');
        return userData.getIn([userId, 'username']);
      })
    ));
