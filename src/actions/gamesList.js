import fetch from 'isomorphic-fetch';
import { getUserData } from './userData';
import _ from 'lodash';

export const JOIN_LOBBY = 'games/JOIN_LOBBY';
export const LEAVE_LOBBY = 'games/LEAVE_LOBBY';
export const REFRESH_LOBBY = 'games/REFRESH_LOBBY';

export const CREATE_GAME = 'games/CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'games/CREATE_GAME_SUCCESS';

export const GAME_CREATED = 'games/GAME_CREATED';

export function joinLobby() {
  return {
    type: JOIN_LOBBY,
    meta: {
      socket: true,
    },
  };
}

export function leaveLobby() {
  return {
    type: LEAVE_LOBBY,
    meta: {
      socket: true,
    },
  };
}

export function refreshLobby(games) {
  return dispatch => {
    const users = _.chain(games)
      .map(game => game.users)
      .flatten()
      .value();

    dispatch(getUserData(...users));
    dispatch({
      type: REFRESH_LOBBY,
      payload: {
        games,
      },
    });
  };
}

function createGameSuccess() {
  return {
    type: CREATE_GAME_SUCCESS,
  };
}

export function gameCreated(game) {
  return dispatch => {
    dispatch(getUserData(...game.users));
    dispatch({
      type: GAME_CREATED,
      payload: {
        game,
      },
    });
  };
}

export function createGame(options) {
  return dispatch => {
    fetch('/api/games', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        options,
      }),
    })
    .then(async res => {
      if (res.ok) {
        const json = await res.json();
        dispatch(createGameSuccess(json.game));
      }
    });
  };
}

export default {
  joinLobby,
  leaveLobby,
  createGame,
};
