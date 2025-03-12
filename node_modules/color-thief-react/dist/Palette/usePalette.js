"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePalette;

var _react = require("react");

var _getPalette = _interopRequireDefault(require("./getPalette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  loading: true,
  data: [],
  error: undefined
};
/**
 * usePalette reducer
 * @param {object} state
 * @param {object} action
 */

function reducer(state, action) {
  switch (action.type) {
    case 'getPalette':
      return initialState;

    case 'resolvePalette':
      return { ...state,
        data: action.payload,
        loading: false
      };

    case 'rejectPalette':
      return { ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
/**
 * React hook for usePalette from PaletteThief
 * @param {String} imgSrc
 * @param {String} format
 * @param {String} crossOrigin
 * @param {Number} quality
 */


function usePalette(imgSrc, colorCount = 2, format = 'rgbString', options = {}) {
  const {
    crossOrigin = null,
    quality = 10
  } = options;
  const [state, dispatch] = (0, _react.useReducer)(reducer, initialState);
  (0, _react.useEffect)(() => {
    dispatch({
      type: 'getPalette'
    });
    (0, _getPalette.default)(imgSrc, colorCount, format, crossOrigin, quality).then(palette => {
      dispatch({
        type: 'resolvePalette',
        payload: palette
      });
    }).catch(ex => {
      dispatch({
        type: 'rejectPalette',
        payload: ex
      });
    });
  }, [imgSrc]);
  return state;
}