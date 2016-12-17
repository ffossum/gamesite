import { createSelector } from 'reselect';
import { NOT_STARTED } from 'constants/gameStatus';
import { addUserDataToMessage } from './util';
import {
  filter,
  get,
  includes,
  map,
} from 'lodash';

export const gameDataSelector = state => get(state, ['data', 'games']);
export const gameByIdSelector = (state, gameId) => get(state, ['data', 'games', gameId]);

export const userDataSelector = state => get(state, ['data', 'users']);

export const userIdSelector = state => get(state, ['session', 'userId']);

export const userSelector = createSelector(
  userIdSelector,
  userDataSelector,
  (userId, userData) => userData[userId]
);

export const gamesNotStartedSelector = createSelector(
  gameDataSelector,
  games => filter(games, game => game && game.status === NOT_STARTED)
);

const mainChatSelector = state => state.mainChat;

export const mainChatWithUserDataSelector = createSelector(
  userDataSelector,
  mainChatSelector,
  (userData, mainChat) => ({
    ...mainChat,
    messages: map(mainChat.messages, addUserDataToMessage(userData)),
  })
);

export const userGamesSelector = createSelector(
  userIdSelector,
  gameDataSelector,
  (userId, games) => filter(games, game => game && includes(game.users, userId))
);
