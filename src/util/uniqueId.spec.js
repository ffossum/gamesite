/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import { uniqueId, resetCounter } from './uniqueId';

describe('uniqueId utility function', () => {
  afterEach(resetCounter);

  it('starts counter at 1', () => {
    expect(uniqueId()).to.equal('1');
  });

  it("auto-increments every time it's called", () => {
    expect(uniqueId()).to.equal('1');
    expect(uniqueId()).to.equal('2');
    expect(uniqueId()).to.equal('3');
  });

  it('restarts at 1 after resetCounter is called', () => {
    expect(uniqueId()).to.equal('1');
    resetCounter();
    expect(uniqueId()).to.equal('1');
  });

  it('prepends input string', () => {
    expect(uniqueId('test')).to.equal('test1');
    expect(uniqueId('asdf')).to.equal('asdf2');
  });
});
