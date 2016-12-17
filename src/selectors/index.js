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
import {
  get,
  map,
  mapValues,
} from 'lodash';

export const playSelector = createSelector(
  gamesNotStartedSelector,
  userDataSelector,
  userSelector,
  (gameData, userData, user) => ({
    games: map(gameData, addUserDataToGame(userData)),
    user,
  })
);

export const mainPageSelector = createSelector(
  mainChatWithUserDataSelector,
  userSelector,
  (mainChat, user) => ({
    messages: mainChat.messages,
    user,
  })
);

export const navSelector = createSelector(
  userGamesSelector,
  userDataSelector,
  userSelector,
  (gameData, userData, user) => ({
    games: mapValues(gameData, addUserDataToGame(userData)),
    user,
  })
);

export const gameRoomSelector = createSelector(
  (state, props) => gameByIdSelector(state, get(props, ['params', 'id'])),
  userDataSelector,
  userSelector,
  (game, userData, user) => {
    if (!game) {
      return {
        game,
        user,
      };
    }

    let gameWithUserData = addUserDataToGame(userData)(game);

    if (gameWithUserData.messages) {
      gameWithUserData = {
        ...gameWithUserData,
        messages: map(gameWithUserData.messages, addUserDataToMessage(userData)),
      };
    }

    return {
      game: gameWithUserData,
      user,
    };
  }
);

export const userSettingsSelector = createSelector(
  userSelector,
  user => ({ user }),
);
