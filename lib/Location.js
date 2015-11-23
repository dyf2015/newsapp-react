'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ntesPubsub = require('ntes-pubsub');

var _ntesPubsub2 = _interopRequireDefault(_ntesPubsub);

var _ObjectAssign = require('./Object.assign');

var _ObjectAssign2 = _interopRequireDefault(_ObjectAssign);

var Location = (function (_React$Component) {
  _inherits(Location, _React$Component);

  function Location(props) {
    _classCallCheck(this, Location);

    _get(Object.getPrototypeOf(Location.prototype), 'constructor', this).call(this, props);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.location = null;
  }

  _createClass(Location, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.token1 = _ntesPubsub2['default'].subscribe('newsapp:location:get', function (callback) {
        if (_this.location) {
          callback(_this.location);
        } else {
          _this.getCurrentLocation(function (location) {
            callback(location);
          });
        }
      });
      this.token2 = _ntesPubsub2['default'].subscribe('newsapp:location:change', function (callback) {
        _this.changeLocation(function (location) {
          callback(location);
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ntesPubsub2['default'].unsubscribe('newsapp:location:get', this.token1);
      _ntesPubsub2['default'].unsubscribe('newsapp:location:change', this.token2);
    }
  }, {
    key: 'getCurrentLocation',
    value: function getCurrentLocation(callback) {
      var _this2 = this;

      if (/NewsApp/ig.test(navigator.userAgent)) {
        this.refs.iframe.src = "location://current";
        window.__newsapp_location_done = function (info) {
          window.__newsapp_location_done = null;
          _this2.location = (0, _ObjectAssign2['default'])({}, info);
          callback(info);
        };
      } else {
        callback(null);
      }
    }
  }, {
    key: 'changeLocation',
    value: function changeLocation(callback) {
      if (/NewsApp/ig.test(navigator.userAgent)) {
        this.refs.iframe.src = "location://switch";
        window.__newsapp_location_done = function (info) {
          return window.__newsapp_location_done = null;
        };
        callback(info || '未知');
      } else {
        callback('未知');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var style = { display: 'none !important' };
      return _react2['default'].createElement('iframe', { ref: 'iframe', style: style });
    }
  }]);

  return Location;
})(_react2['default'].Component);

exports['default'] = Location;
module.exports = exports['default'];