'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ntesPubsub = require('ntes-pubsub');

var _ntesPubsub2 = _interopRequireDefault(_ntesPubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Copy = (function (_React$Component) {
  _inherits(Copy, _React$Component);

  function Copy(props) {
    _classCallCheck(this, Copy);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Copy).call(this, props));

    _this.token = null;
    return _this;
  }

  _createClass(Copy, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.token = _ntesPubsub2.default.subscribe('newsapp:copy', function (copyText) {
        _this2.refs.iframe.src = 'copy://' + encodeURIComponent(copyText);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ntesPubsub2.default.unsubscribe('newsapp:copy', this.token);
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        display: 'none !important'
      };
      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement('iframe', { ref: 'iframe', style: style })
      );
    }
  }]);

  return Copy;
})(_react2.default.Component);

exports.default = Copy;