import fetch from 'isomorphic-fetch';

export const CREATE_GAME = 'games/CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'games/CREATE_GAME_SUCCESS';

function createGameSuccess(game) {
  return {
    type: CREATE_GAME_SUCCESS,
    payload: {
      game,
    },
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
  createGame,
};
