export const addUserDataToGame = userData =>
  game => (
    game.update('users', users => (
      users.map(userId => userData.get(userId) || { id: userId })
    ))
  );

export const addUserDataToMessage = userData =>
  message => {
    const userId = message.get('user');
    return message.set('user', userData.get(userId) || { id: userId });
  };
