/* @flow */
/* eslint-env jest */

import { getPublicUserData } from './userDataUtils';

describe('getPublicUserData', () => {
  const user = {
    username: 'asdf',
    id: 'asdf',
    email: 'secret',
    emailHash: 'asdfasdfasdf',
    password: 'super secret',
  };

  it('strips away non-public data from user object', () => {
    const publicData = getPublicUserData(user);
    expect(publicData).toEqual({
      username: 'asdf',
      id: 'asdf',
      emailHash: 'asdfasdfasdf',
    });
  });

  it('does not mutate the original object', () => {
    getPublicUserData(user);
    expect(user).toEqual({
      username: 'asdf',
      id: 'asdf',
      email: 'secret',
      emailHash: 'asdfasdfasdf',
      password: 'super secret',
    });
  });
});
