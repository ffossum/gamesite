import fetch from 'isomorphic-fetch';

export const GET_USER_DATA = 'userData/GET';

export function getUserData(...userIds) {
  return dispatch => {
    fetch(`/api/users?id=${userIds.join(',')}`)
      .then(async res => {
        if (res.ok) {
          const json = await res.json();
          dispatch({
            type: GET_USER_DATA,
            payload: {
              users: json.users,
            },
          });
        }
      });
  };
}

export default {
  getUserData,
};
