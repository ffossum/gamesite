/* @flow */
type GetUserDataRequestType = 'userData/REQUEST';
type GetUserDataSuccessType = 'userData/SUCCESS';
export const GET_USER_DATA_REQUEST = 'userData/REQUEST';
export const GET_USER_DATA_SUCCESS = 'userData/SUCCESS';

type PublicUserDataObject = {
  [key: UserId]: PublicUserData,
}
type GetUserDataSuccessAction = {
  type: GetUserDataSuccessType,
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
  type: GetUserDataRequestType,
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
