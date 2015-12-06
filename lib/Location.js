'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ntesPubsub = require('ntes-pubsub');

var _ntesPubsub2 = _interopRequireDefault(_ntesPubsub);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Location = (function (_React$Component) {
  _inherits(Location, _React$Component);

  function Location(props) {
    _classCallCheck(this, Location);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Location).call(this, props));

    _this.getCurrentLocation = _this.getCurrentLocation.bind(_this);
    _this.changeLocation = _this.changeLocation.bind(_this);
    _this.location = null;
    return _this;
  }

  _createClass(Location, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.token1 = _ntesPubsub2.default.subscribe('newsapp:location:get', function (callback) {
        if (_this2.location) {
          callback(_this2.location);
        } else {
          _this2.getCurrentLocation(function (location) {
            callback(location);
          });
        }
      });
      this.token2 = _ntesPubsub2.default.subscribe('newsapp:location:change', function (callback) {
        _this2.changeLocation(function (location) {
          callback(location);
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ntesPubsub2.default.unsubscribe('newsapp:location:get', this.token1);
      _ntesPubsub2.default.unsubscribe('newsapp:location:change', this.token2);
    }
  }, {
    key: 'getCurrentLocation',
    value: function getCurrentLocation(callback) {
      var _this3 = this;

      if (/NewsApp/ig.test(navigator.userAgent)) {
        this.refs.iframe.src = "location://current";
        window.__newsapp_location_done = function (info) {
          window.__newsapp_location_done = null;
          _this3.location = (0, _objectAssign2.default)({}, info);
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
          window.__newsapp_location_done = null;
          callback(info || '未知');
        };
      } else {
        callback('未知');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var style = { display: 'none !important' };
      return _react2.default.createElement('iframe', { ref: 'iframe', style: style });
    }
  }]);

  return Location;
})(_react2.default.Component);

exports.default = Location;