"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-children-prop */
describe('Color', () => {
  const src = 'https://i.picsum.photos/id/237/536/354.jpg';
  const timeout = 10000;
  test('should be a children with default format', async () => {
    const format = 'rgbString';
    const children = jest.fn(() => null);
    const color = await (0, _.getColor)(src, format, 'Anonymous');
    await (0, _react2.act)(async () => {
      (0, _react2.render)(_react.default.createElement(_.Color, {
        src: src,
        children: children,
        crossOrigin: "Anonymous"
      }));
    });
    expect(children).toHaveBeenCalledWith({
      loading: true,
      error: undefined,
      data: null
    });
    await (0, _react2.wait)(() => expect(children).toHaveBeenCalledTimes(2));
    expect(children).toHaveBeenCalledWith({
      loading: false,
      error: undefined,
      data: color
    });
  }, timeout);
  test('should be a children with rgb array', async () => {
    const format = 'rgbArray';
    const children = jest.fn(() => null);
    const color = await (0, _.getColor)(src, format, 'Anonymous');
    await (0, _react2.act)(async () => {
      (0, _react2.render)(_react.default.createElement(_.Color, {
        src: src,
        format: format,
        children: children,
        crossOrigin: "Anonymous"
      }));
    });
    expect(children).toHaveBeenCalledWith({
      loading: true,
      error: undefined,
      data: null
    });
    await (0, _react2.wait)(() => expect(children).toHaveBeenCalledTimes(2));
    expect(children).toHaveBeenCalledWith({
      loading: false,
      error: undefined,
      data: color
    });
  }, timeout);
  test('should be a children with rgb string', async () => {
    const format = 'rgbString';
    const children = jest.fn(() => null);
    const color = await (0, _.getColor)(src, format, 'Anonymous');
    await (0, _react2.act)(async () => {
      (0, _react2.render)(_react.default.createElement(_.Color, {
        src: src,
        format: format,
        children: children,
        crossOrigin: "Anonymous"
      }));
    });
    expect(children).toHaveBeenCalledWith({
      loading: true,
      error: undefined,
      data: null
    });
    await (0, _react2.wait)(() => expect(children).toHaveBeenCalledTimes(2));
    expect(children).toHaveBeenCalledWith({
      loading: false,
      error: undefined,
      data: color
    });
  }, timeout);
  test('should be a children with hex', async () => {
    const format = 'hex';
    const children = jest.fn(() => null);
    const color = await (0, _.getColor)(src, format, 'Anonymous');
    await (0, _react2.act)(async () => {
      (0, _react2.render)(_react.default.createElement(_.Color, {
        src: src,
        format: format,
        children: children,
        crossOrigin: "Anonymous"
      }));
    });
    expect(children).toHaveBeenCalledWith({
      loading: true,
      error: undefined,
      data: null
    });
    await (0, _react2.wait)(() => expect(children).toHaveBeenCalledTimes(2));
    expect(children).toHaveBeenCalledWith({
      loading: false,
      error: undefined,
      data: color
    });
  }, timeout);
});