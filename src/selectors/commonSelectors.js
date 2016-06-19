import { createSelector } from 'reselect';
import { NOT_STARTED } from 'constants/gameStatus';
import { addUserDataToMessage } from './util';

const gameDataSelector = state => state.getIn(['data', 'games']);

export const userDataSelector = state => state.getIn(['data', 'users']);

const userIdSelector = state => state.getIn(['session', 'userId']);

export const userSelector = createSelector(
  userIdSelector,
  userDataSelector,
  (userId, userData) => {
    const user = userData.get(userId);
    return user && user.toJS();
  }
);

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

export const userGamesSelector = createSelector(
  userIdSelector,
  gameDataSelector,
  (userId, games) => games.filter(game => (
      game && game.get('users').has(userId)
  ))
);
