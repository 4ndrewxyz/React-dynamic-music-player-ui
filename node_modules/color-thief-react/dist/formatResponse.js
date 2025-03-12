"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatResponse;

var _rgbStringfy = _interopRequireDefault(require("./rgbStringfy"));

var _rgbToHex = _interopRequireDefault(require("./rgbToHex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatResponse(arrayRGB, format) {
  switch (format) {
    case 'rgbString':
      return (0, _rgbStringfy.default)(arrayRGB[0], arrayRGB[1], arrayRGB[2]);

    case 'hex':
      return (0, _rgbToHex.default)(arrayRGB[0], arrayRGB[1], arrayRGB[2]);

    default:
      return arrayRGB;
  }
}