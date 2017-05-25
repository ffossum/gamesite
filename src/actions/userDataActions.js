/* @flow */
export const GET_USER_DATA_REQUEST = 'userData/REQUEST';
export const GET_USER_DATA_SUCCESS = 'userData/SUCCESS';

type PublicUserDataObject = {
  [key: UserId]: PublicUserData,
}
type GetUserDataSuccessAction = {
  type: 'userData/SUCCESS',
  payload: {
    users: PublicUserDataObject,
  }
}
export function getUserDataSuccess(users: PublicUserDataObject): GetUserDataSuccessAction {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload: {
      users,
    },
  };
}

type GetUserDataRequestAction = {
  type: 'userData/REQUEST',
  payload: UserId[],
}
export function getUserData(...userIds: UserId[]): GetUserDataRequestAction {
  return {
    type: GET_USER_DATA_REQUEST,
    payload: userIds,
  };
}

export type UserDataAction =
  | GetUserDataSuccessAction
  | GetUserDataRequestAction
  ;

export default {
  getUserData,
  getUserDataSuccess,
};
