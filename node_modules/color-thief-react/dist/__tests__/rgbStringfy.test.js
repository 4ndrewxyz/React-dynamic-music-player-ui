"use strict";

var _rgbStringfy = _interopRequireDefault(require("../rgbStringfy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('fn: rgbStringfy', () => {
  test('should return a right string of RGB', () => {
    const rgbArray = [230, 102, 34];
    const hex = (0, _rgbStringfy.default)(rgbArray[0], rgbArray[1], rgbArray[2]);
    expect(hex).toBe('rgb(230, 102, 34)');
  });
});