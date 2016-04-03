import fetch from 'isomorphic-fetch';
import _ from 'lodash';

export const GET_USER_DATA = 'userData/GET';

export function getUserData(...userIds) {
  return (dispatch, getState) => {
    const stateUsers = getState().getIn(['data', 'users']);
    const missingUserIds = _.filter(userIds, userId => !stateUsers.has(userId));

    if (_.isEmpty(missingUserIds)) {
      return;
    }

    fetch(`/api/users?id=${missingUserIds.join(',')}`)
      .then(res => {
        res.json().then(json => {
          if (res.ok) {
            dispatch({
              type: GET_USER_DATA,
              payload: {
                users: json.users,
              },
            });
          }
        });
      });
  };
}

export default {
  getUserData,
};
