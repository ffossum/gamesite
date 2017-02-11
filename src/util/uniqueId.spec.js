// @flow
/* eslint-env jest */
import { uniqueId, resetCounter } from './uniqueId';

describe('uniqueId utility function', () => {
  afterEach(resetCounter);

  it('starts counter at 1', () => {
    expect(uniqueId()).toBe('1');
  });

  it("auto-increments every time it's called", () => {
    expect(uniqueId()).toBe('1');
    expect(uniqueId()).toBe('2');
    expect(uniqueId()).toBe('3');
  });

  it('restarts at 1 after resetCounter is called', () => {
    expect(uniqueId()).toBe('1');
    resetCounter();
    expect(uniqueId()).toBe('1');
  });

  it('prepends input string', () => {
    expect(uniqueId('test')).toBe('test1');
    expect(uniqueId('asdf')).toBe('asdf2');
  });
});
