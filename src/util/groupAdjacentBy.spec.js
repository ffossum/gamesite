// @flow
/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import groupAdjacentBy from './groupAdjacentBy';
import { expect } from 'chai';

describe('groupAdjacentBy', () => {
  it('groups equal adjacent items', () => {
    const before = ['a', 'a', 'b', 'c', 'b'];
    const after = groupAdjacentBy(before);
    expect(after).to.deep.equal([['a', 'a'], ['b'], ['c'], ['b']]);
  });

  it('does not mutate the input array', () => {
    const before = ['a', 'a', 'b', 'c', 'b'];
    groupAdjacentBy(before);
    expect(before).to.deep.equal(['a', 'a', 'b', 'c', 'b']);
  });

  it('determines equality by input function', () => {
    const before = [1, 2, 9, 8, 3, 7, 3];
    const after = groupAdjacentBy(before, x => x > 5);
    expect(after).to.deep.equal([[1, 2], [9, 8], [3], [7], [3]]);
  });

  it('always groups ignored values by themselves', () => {
    const before = [1, 2, 3, 9, 8, 3, 3];
    const after = groupAdjacentBy(before, x => x > 5, {
      ignore: x => x === 3,
    });
    expect(after).to.deep.equal([[1, 2], [3], [9, 8], [3], [3]]);
  });
});
