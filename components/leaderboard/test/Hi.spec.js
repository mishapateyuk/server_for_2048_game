/* eslint no-undef: 'off' */
const Hi = require('../components/Hi');

describe('Hi', () => {
  it('should return number', () => {
    const _hi = new Hi();

    const result = _hi.hi();

    expect(result).toEqual(26);
  });
});
