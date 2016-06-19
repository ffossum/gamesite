import { createSelector } from 'reselect';
import {
  gamesNotStartedSelector,
  userDataSelector,
  userSelector,
  mainChatWithUserDataSelector,
  userGamesSelector,
  gameByIdSelector,
} from './commonSelectors';
import {
  addUserDataToGame,
  addUserDataToMessage,
} from './util';

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

export const gameRoomSelector = createSelector(
  gameByIdSelector,
  userDataSelector,
  userSelector,
  (game, userData, user) => ({
    game: game && addUserDataToGame(userData)(
      game.update('messages', messages => messages.map(addUserDataToMessage(userData)))
    ).toJS(),
    user,
  })
);
