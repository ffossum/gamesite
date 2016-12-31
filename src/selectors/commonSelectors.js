import { createSelector } from 'reselect';
import { NOT_STARTED } from 'constants/gameStatus';
import { addUserDataToMessage } from './util';
import {
  filter,
  get,
  includes,
  map,
} from 'lodash/fp';

export const gameDataSelector = state => get(['data', 'games'], state);
export const gameByIdSelector = (state, gameId) => get(['data', 'games', gameId], state);

export const userDataSelector = state => get(['data', 'users'], state);

export const userIdSelector = state => get(['session', 'userId'], state);

export const lobbyLastRefreshedSelector = state => get(['lobby', 'lastRefreshed'], state);

export const userSelector = createSelector(
  userIdSelector,
  userDataSelector,
  (userId, userData) => userData[userId]
);

export const gamesNotStartedSelector = createSelector(
  gameDataSelector,
  games => filter(game => game && game.status === NOT_STARTED, games)
);

const mainChatSelector = state => state.mainChat;

export const mainChatWithUserDataSelector = createSelector(
  userDataSelector,
  mainChatSelector,
  (userData, mainChat) => ({
    ...mainChat,
    messages: map(addUserDataToMessage(userData), mainChat.messages),
  })
);

export const userGamesSelector = createSelector(
  userIdSelector,
  gameDataSelector,
  (userId, games) => filter(game => game && includes(userId, game.users), games)
);
