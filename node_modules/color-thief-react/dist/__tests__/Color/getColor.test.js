"use strict";

var _ = require("../..");

describe('getColor', () => {
  test('return default values', async () => {
    const src = 'https://i.picsum.photos/id/237/536/354.jpg';
    const actual = await (0, _.getColor)(src, 'rgbString', 'Anonymous');
    expect(actual).toMatchSnapshot();
  });
});