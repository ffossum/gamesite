import { createSelector } from 'reselect';
import {
  gamesNotStartedSelector,
  userDataSelector,
  userSelector,
  mainChatWithUserDataSelector,
  userGamesSelector,
} from './commonSelectors';
import { addUserDataToGame } from './util';

export const playSelector = createSelector(
  gamesNotStartedSelector,
  userDataSelector,
  userSelector,
  (gameData, userData, user) => ({
    games: gameData.map(addUserDataToGame(userData)).toList().toJS(),
    user,
  })
);

export const mainPageSelector = createSelector(
  mainChatWithUserDataSelector,
  userSelector,
  (mainChat, user) => ({
    messages: mainChat.get('messages').toJS(),
    user,
  })
);

export const navSelector = createSelector(
  userGamesSelector,
  userDataSelector,
  userSelector,
  (gameData, userData, user) => ({
    games: gameData.map(addUserDataToGame(userData)).toJS(),
    user,
  })
);
