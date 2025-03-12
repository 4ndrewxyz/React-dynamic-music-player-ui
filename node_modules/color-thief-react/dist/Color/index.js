"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useColor = _interopRequireDefault(require("./useColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Color = ({
  src,
  format,
  crossOrigin,
  quality,
  children
}) => {
  const color = (0, _useColor.default)(src, format, {
    crossOrigin,
    quality
  });
  return _react.default.createElement(_react.default.Fragment, null, children(color));
};

Color.defaultProps = {
  format: 'rgbString',
  crossOrigin: null,
  quality: 10
};
Color.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: _propTypes.default.any.isRequired,

  /**
   * Required. Link of the image
   */
  src: _propTypes.default.string.isRequired,

  /**
   * Format of the response. Can be 'rgbToString' or 'rgbToArray' or 'hex'
   */
  format: _propTypes.default.oneOf(['rgbString', 'rgbArray', 'hex']),

  /**
   * Tag cross-origin for image
   */
  crossOrigin: _propTypes.default.string,

  /**
   * Quality determines how many pixels are skipped before the nex one is sampled.We rarely need to sample every single pixel in the image to get good results. The bigger the number, the faster a value will be returned. Read more in https://lokeshdhakar.com/projects/color-thief/
   */
  quality: _propTypes.default.number
};
var _default = Color;
exports.default = _default;