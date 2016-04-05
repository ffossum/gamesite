/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import getPublicUserData from './getPublicUserData';

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
    expect(publicData).to.deep.equal({
      username: 'asdf',
      id: 'asdf',
      emailHash: 'asdfasdfasdf',
    });
  });

  it('does not mutate the original object', () => {
    getPublicUserData(user);
    expect(user).to.deep.equal({
      username: 'asdf',
      id: 'asdf',
      email: 'secret',
      emailHash: 'asdfasdfasdf',
      password: 'super secret',
    });
  });
});
