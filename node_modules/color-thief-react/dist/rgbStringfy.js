"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rgbStringfy;

/**
 * Put RGB into a string
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 */
function rgbStringfy(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}