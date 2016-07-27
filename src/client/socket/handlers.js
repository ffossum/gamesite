import {
  LOG_IN_SUCCESS, logInSuccess,
} from 'actions/login';
import {
  NEW_MESSAGE, newMessage,
} from 'actions/mainChat';
import {
  GAME_CREATED, gameCreated,
  REFRESH_LOBBY, refreshLobby,
} from 'actions/gamesList';
import {
  PLAYER_JOINED, playerJoined,
  PLAYER_LEFT, playerLeft,
  GAME_STARTED, gameStarted,
  GAME_ENDED, gameEnded,
  GAME_CANCELED, gameCanceled,
} from 'actions/gameRoom';
import {
  NEW_GAME_MESSAGE, newGameMessage,
} from 'actions/gameChat';
import {
  NEW_ACTION, newAction,
} from 'actions/game';

export function createHandlers(store) {
  return {
    news: data => {
      console.log(data);
    },
    [NEW_MESSAGE]: message => store.dispatch(newMessage(message)),
    [LOG_IN_SUCCESS]: data => store.dispatch(logInSuccess(data.user, data.games)),
    [GAME_CREATED]: data => store.dispatch(gameCreated(data.game)),
    [REFRESH_LOBBY]: ({ games, refreshed }) => store.dispatch(refreshLobby({ games, refreshed })),
    [PLAYER_JOINED]: ({ game, user }) => store.dispatch(playerJoined(game.id, user.id)),
    [PLAYER_LEFT]: ({ game, user }) => store.dispatch(playerLeft(game.id, user.id)),
    [NEW_GAME_MESSAGE]: ({ game, message }) => store.dispatch(newGameMessage(game.id, message)),
    [GAME_STARTED]: ({ game }) => store.dispatch(gameStarted(game.id, game.state)),
    [NEW_ACTION]: ({ game, state }) => store.dispatch(newAction(game, state)),
    [GAME_ENDED]: ({ game }) => store.dispatch(gameEnded(game.id)),
    [GAME_CANCELED]: ({ game }) => store.dispatch(gameCanceled(game.id)),
  };
}
