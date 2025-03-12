"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getColor;

var _colorThiefUmd = _interopRequireDefault(require("colorthief/dist/color-thief.umd.js"));

var _formatResponse = _interopRequireDefault(require("../formatResponse"));

var _loadImage = _interopRequireDefault(require("../loadImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-named-as-default-member */

/* eslint-disable import/no-named-as-default */

/**
 * Get the main color from a URL image
 * @param {String} imgSrc
 * @param {String} format
 * @param {String} crossOrigin
 * @param {Number} quality
 * @returns {Promise} Promise object represents a clArray representing [R, G, B]
 */
async function getColor(imgSrc, format = 'rgbString', crossOrigin = null, quality = 10) {
  const img = await (0, _loadImage.default)(imgSrc, crossOrigin);
  const colorthief = new _colorThiefUmd.default();
  const arrayRGB = colorthief.getColor(img, quality);
  return (0, _formatResponse.default)(arrayRGB, format);
}