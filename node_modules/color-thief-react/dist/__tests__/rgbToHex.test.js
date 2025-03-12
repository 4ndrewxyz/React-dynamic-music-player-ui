"use strict";

var _rgbToHex = _interopRequireDefault(require("../rgbToHex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('fn: rgbToHex', () => {
  test('should return a right hex', () => {
    const rgbArray = [230, 102, 34];
    const hex = (0, _rgbToHex.default)(rgbArray[0], rgbArray[1], rgbArray[2]);
    expect(hex).toBe('#e66622');
  });
});