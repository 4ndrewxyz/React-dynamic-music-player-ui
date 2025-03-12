"use strict";

var _ = require("../..");

describe('getPalette', () => {
  test('return default values', async () => {
    const src = 'https://i.picsum.photos/id/237/536/354.jpg';
    const actual = await (0, _.getPalette)(src, 'rgbString', 'Anonymous');
    expect(actual).toMatchSnapshot();
  });
});