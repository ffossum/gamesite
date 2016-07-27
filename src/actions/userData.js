import fetch from 'isomorphic-fetch';
import {
  filter,
  get,
  isEmpty,
  uniq,
} from 'lodash';

export const GET_USER_DATA = 'userData/GET';

const pendingFetches = {};

export function addUserData(users) {
  return {
    type: GET_USER_DATA,
    payload: {
      users,
    },
  };
}

export function getUserData(...userIds) {
  return (dispatch, getState) => {
    const stateUsers = get(getState(), ['data', 'users']);
    const missingUserIds = filter(uniq(userIds), userId => !stateUsers[userId]);

    if (isEmpty(missingUserIds)) {
      return;
    }

    missingUserIds.sort();
    const fetchUrl = `/api/users?id=${missingUserIds.join(',')}`;

    if (!pendingFetches[fetchUrl]) {
      pendingFetches[fetchUrl] = true;

      fetch(fetchUrl)
        .then(res => {
          res.json()
            .then(json => {
              if (res.ok) {
                dispatch(addUserData(json.users));
              }
              delete pendingFetches[fetchUrl];
            })
            .catch(() => {
              delete pendingFetches[fetchUrl];
            });
        });
    }
  };
}

export default {
  getUserData,
};
