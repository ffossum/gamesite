/* @flow */
/* eslint-env jest */

import groupAdjacentBy from './groupAdjacentBy';

describe('groupAdjacentBy', () => {
  test('groups equal adjacent items', () => {
    const before = ['a', 'a', 'b', 'c', 'b'];
    const after = groupAdjacentBy(before);
    expect(after).toEqual([['a', 'a'], ['b'], ['c'], ['b']]);
  });

  test('does not mutate the input array', () => {
    const before = ['a', 'a', 'b', 'c', 'b'];
    groupAdjacentBy(before);
    expect(before).toEqual(['a', 'a', 'b', 'c', 'b']);
  });

  test('determines equality by input function', () => {
    const before = [1, 2, 9, 8, 3, 7, 3];
    const after = groupAdjacentBy(before, x => x > 5);
    expect(after).toEqual([[1, 2], [9, 8], [3], [7], [3]]);
  });

  test('always groups ignored values by themselves', () => {
    const before = [1, 2, 3, 9, 8, 3, 3];
    const after = groupAdjacentBy(before, x => x > 5, {
      ignore: x => x === 3,
    });
    expect(after).toEqual([[1, 2], [3], [9, 8], [3], [3]]);
  });
});
