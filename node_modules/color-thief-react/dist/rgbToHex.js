"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rgbToHex;

/**
 * Transform RGB to HEX
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 */
function rgbToHex(r, g, b) {
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }).join('')}`;
}