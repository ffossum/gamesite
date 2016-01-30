import fetch from 'isomorphic-fetch';

export const LOGGED_IN = 'login/LOGGED_IN';
export const LOGGED_OUT = 'login/LOGGED_OUT';

export const types = {
  LOGGED_IN,
  LOGGED_OUT
};

function loggedIn(userId) {
  return {
    type: LOGGED_IN,
    payload: {
      userId
    }
  };
}

export default {
  loggedIn
}
