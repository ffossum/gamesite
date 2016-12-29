export const GET_USER_DATA_REQUEST = 'userData/REQUEST';
export const GET_USER_DATA_SUCCESS = 'userData/SUCCESS';

export function getUserDataSuccess(users) {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload: {
      users,
    },
  };
}

export function getUserData(...userIds) {
  return {
    type: GET_USER_DATA_REQUEST,
    payload: userIds,
  };
}

export default {
  getUserData,
  getUserDataSuccess,
};
