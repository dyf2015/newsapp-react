'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libLocation = require('./lib/Location');

var _libLocation2 = _interopRequireDefault(_libLocation);

var _libLogin = require('./lib/Login');

var _libLogin2 = _interopRequireDefault(_libLogin);

var _libShare = require('./lib/Share');

var _libShare2 = _interopRequireDefault(_libShare);

var _libUI = require('./lib/UI');

var _libUI2 = _interopRequireDefault(_libUI);

var _libUpload = require('./lib/Upload');

var _libUpload2 = _interopRequireDefault(_libUpload);

var Newsapp = {
  Location: _libLocation2['default'],
  Login: _libLogin2['default'],
  Share: _libShare2['default'],
  UI: _libUI2['default'],
  Upload: _libUpload2['default']
};
exports['default'] = Newsapp;
module.exports = exports['default'];

