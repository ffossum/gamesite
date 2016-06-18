import { createSelector } from 'reselect';
import { NOT_STARTED } from 'constants/gameStatus';
import { addUserDataToMessage } from './util';

const gameDataSelector = state => state.getIn(['data', 'games']);

export const userDataSelector = state => state.getIn(['data', 'users']);

export const userSelector = state => {
  const sessionUserId = state.getIn(['session', 'userId']);
  const user = state.getIn(['data', 'users', sessionUserId]);
  return user && user.toJS();
};

export const gamesNotStartedSelector = createSelector(
  gameDataSelector,
  games => games.filter(game => game && game.get('status') === NOT_STARTED)
);

const mainChatSelector = state => state.get('mainChat');

export const mainChatWithUserDataSelector = createSelector(
  userDataSelector,
  mainChatSelector,
  (userData, mainChat) => mainChat.update('messages', messages => (
    messages.map(addUserDataToMessage(userData))
  ))
);
