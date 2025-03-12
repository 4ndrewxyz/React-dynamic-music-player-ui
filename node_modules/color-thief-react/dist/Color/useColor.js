"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useColor;

var _react = require("react");

var _getColor = _interopRequireDefault(require("./getColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  loading: true,
  data: null,
  error: undefined
};
/**
 * useColor reducer
 * @param {object} state
 * @param {object} action
 */

function reducer(state, action) {
  switch (action.type) {
    case 'getColor':
      return initialState;

    case 'resolveColor':
      return { ...state,
        data: action.payload,
        loading: false
      };

    case 'rejectColor':
      return { ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
/**
 * React hook for useColor from colorThief
 * @param {String} imgSrc
 * @param {String} format
 * @param {String} crossOrigin
 * @param {Number} quality
 */


function useColor(imgSrc, format = 'rgbString', options = {}) {
  const {
    crossOrigin = null,
    quality = 10
  } = options;
  const [state, dispatch] = (0, _react.useReducer)(reducer, initialState);
  (0, _react.useEffect)(() => {
    dispatch({
      type: 'getColor'
    });
    (0, _getColor.default)(imgSrc, format, crossOrigin, quality).then(color => {
      dispatch({
        type: 'resolveColor',
        payload: color
      });
    }).catch(ex => {
      dispatch({
        type: 'rejectColor',
        payload: ex
      });
    });
  }, [imgSrc]);
  return state;
}