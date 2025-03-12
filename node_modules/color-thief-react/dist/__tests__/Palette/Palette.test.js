"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-children-prop */
describe('Palette', () => {
  const src = 'https://i.picsum.photos/id/237/536/354.jpg';
  const timeout = 10000;
  test('should be a children with default format', async () => {
    const format = 'rgbString';
    const children = jest.fn(() => null);
    const colors = await (0, _.getPalette)(src, 2, format, 'Anonymous');
    await (0, _react2.act)(async () => {
      (0, _react2.render)(_react.default.createElement(_.Palette, {
        src: src,
        children: children,
        crossOrigin: "Anonymous"
      }));
    });
    expect(children).toHaveBeenCalledWith({
      loading: true,
      error: undefined,
      data: []
    });
    await (0, _react2.wait)(() => expect(children).toHaveBeenCalledTimes(2));
    expect(children).toHaveBeenCalledWith({
      loading: false,
      error: undefined,
      data: colors
    });
  }, timeout);
  test('should be a children with rgb array', async () => {
    const format = 'rgbArray';
    const children = jest.fn(() => null);
    const palette = await (0, _.getPalette)(src, 2, format, 'Anonymous');
    await (0, _react2.act)(async () => {
      (0, _react2.render)(_react.default.createElement(_.Palette, {
        src: src,
        format: format,
        children: children,
        crossOrigin: "Anonymous"
      }));
    });
    expect(children).toHaveBeenCalledWith({
      loading: true,
      error: undefined,
      data: []
    });
    await (0, _react2.wait)(() => expect(children).toHaveBeenCalledTimes(2));
    expect(children).toHaveBeenCalledWith({
      loading: false,
      error: undefined,
      data: palette
    });
  }, timeout);
  test('should be a children with rgb string', async () => {
    const format = 'rgbString';
    const children = jest.fn(() => null);
    const palette = await (0, _.getPalette)(src, 2, format, 'Anonymous');
    await (0, _react2.act)(async () => {
      (0, _react2.render)(_react.default.createElement(_.Palette, {
        src: src,
        format: format,
        children: children,
        crossOrigin: "Anonymous"
      }));
    });
    expect(children).toHaveBeenCalledWith({
      loading: true,
      error: undefined,
      data: []
    });
    await (0, _react2.wait)(() => expect(children).toHaveBeenCalledTimes(2));
    expect(children).toHaveBeenCalledWith({
      loading: false,
      error: undefined,
      data: palette
    });
  }, timeout);
  test('should be a children with hex', async () => {
    const format = 'hex';
    const children = jest.fn(() => null);
    const palette = await (0, _.getPalette)(src, 2, format, 'Anonymous');
    await (0, _react2.act)(async () => {
      (0, _react2.render)(_react.default.createElement(_.Palette, {
        src: src,
        format: format,
        children: children,
        crossOrigin: "Anonymous"
      }));
    });
    expect(children).toHaveBeenCalledWith({
      loading: true,
      error: undefined,
      data: []
    });
    await (0, _react2.wait)(() => expect(children).toHaveBeenCalledTimes(2));
    expect(children).toHaveBeenCalledWith({
      loading: false,
      error: undefined,
      data: palette
    });
  }, timeout);
  test('should be a children with hex with 4 colors', async () => {
    const format = 'hex';
    const colorCount = 4;
    const children = jest.fn(() => null);
    const palette = await (0, _.getPalette)(src, colorCount, format, 'Anonymous');
    await (0, _react2.act)(async () => {
      (0, _react2.render)(_react.default.createElement(_.Palette, {
        src: src,
        format: format,
        children: children,
        colorCount: 4,
        crossOrigin: "Anonymous"
      }));
    });
    expect(children).toHaveBeenCalledWith({
      loading: true,
      error: undefined,
      data: []
    });
    await (0, _react2.wait)(() => expect(children).toHaveBeenCalledTimes(2));
    expect(children).toHaveBeenCalledWith({
      loading: false,
      error: undefined,
      data: palette
    });
  }, timeout);
});